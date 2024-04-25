import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNewDocument = mutation({
  args: { parentDocumentId: v.optional(v.id("documents")) },

  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    // Query to create new document
    const document = await ctx.db.insert("documents", {
      title: "Untitled",
      userId,
      isArchived: false,
      isPublished: false,
      parentDocument: args.parentDocumentId,
    });

    return document;
  },
});

export const getAllDocuments = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const updateDocument = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    //Get id from arguments
    const { id, ...rest } = args;

    //Check if doc exist
    const existingDoc = await ctx.db.get(id);
    // If doc does not exist
    if (!existingDoc) {
      throw new Error("Not found");
    }
    // If user does not own the doc
    if (existingDoc.userId !== userId) {
      throw new Error("Not authorized");
    }

    const updatedDocument = await ctx.db.patch(id, { ...rest });

    return updatedDocument;
  },
});

export const getDocById = query({
  args: {
    id: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    if (!args.id) return;
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    //Check if doc exist
    const existingDoc = await ctx.db.get(args.id);
    // If doc does not exist
    if (!existingDoc) {
      throw new Error("Not found");
    }
    // If user does not own the doc
    if (existingDoc.userId !== userId) {
      throw new Error("Not authorized");
    }

    return existingDoc;
  },
});

export const archiveDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    //Check if doc exist
    const existingDoc = await ctx.db.get(args.id);
    // If doc does not exist
    if (!existingDoc) {
      throw new Error("Not found");
    }
    // If user does not own the doc
    if (existingDoc.userId !== userId) {
      throw new Error("Not authorized");
    }

    // Archive doc and all its children
    async function recursiveArchive(documentId: Id<"documents">) {
      // Get all children of current doc
      const childrenDocs = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      // Archive all children
      for (const child of childrenDocs) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });
        // Call recursive fucntion on each children
        await recursiveArchive(child._id);
      }
    }

    // Finally archive the main document
    const archive = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    // Call recursive function
    recursiveArchive(args.id);

    return archive;
  },
});

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    //Check if doc exist
    const existingDoc = await ctx.db.get(args.documentId);
    // If doc does not exist
    if (!existingDoc) {
      throw new Error("Not found");
    }
    // If user does not own the doc
    if (existingDoc.userId !== userId) {
      throw new Error("Not authorized");
    }

    const document = ctx.db.delete(args.documentId);
    return document;
  },
});

export const getAllArchivedDocuments = query({
  handler: async (ctx) => {
    // Current user infor from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    // Get current user's all archived posts
    const archived = ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("isArchived"), true))
      .collect();

    return archived;
  },
});

export const restoreDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    // Current user info from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;

    const archivedDoc = await ctx.db.get(args.documentId);

    if (!archivedDoc) {
      throw new Error("Document not found!");
    }

    if (archivedDoc.userId !== userId) {
      throw new Error("Not authorized");
    }

    // Restore doc and all its children
    async function recursiveRestore(documentId: Id<"documents">) {
      //Get all children
      const childrenDocs = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      // Restore all children
      for (const child of childrenDocs) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        // call recursiveRestore on all children
        await recursiveRestore(child._id);
      }
    }
    // Restore main document
    const doc = await ctx.db.patch(args.documentId, { isArchived: false });

    //Call recursive fucntion
    await recursiveRestore(args.documentId);

    return doc;
  },
});

export const removeCoverImage = mutation({
  args: {
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    // Current user info from the context
    const identity = await ctx.auth.getUserIdentity();
    // If no user then Error
    if (!identity) {
      throw new Error("Not authenticated");
    }
    // Get userId from current user object
    const userId = identity.subject;
    const currentDocument = await ctx.db.get(args.documentId);

    if (!currentDocument) {
      throw new Error("Document not found!");
    }

    if (currentDocument.userId !== userId) {
      throw new Error("Not authorized");
    }

    //Delete link from convex
    const document = await ctx.db.patch(args.documentId, {
      coverImage: undefined,
    });

    return document;
  },
});
