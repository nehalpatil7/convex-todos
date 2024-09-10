import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireUser } from "./helpers";

export const listTodos = query({
    handler: async (ctx) => {
        const user = await requireUser(ctx);
        return await ctx.db.query("todos").withIndex("by_user_id", q => q.eq("userId", user.tokenIdentifier)).collect();
    },
});

export const createTodo = mutation({
    args: {
        title: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        await ctx.db.insert("todos", {
            title: args.title,
            description: args.description,
            completed: false,
            userId: user.tokenIdentifier,
        });
    },
});

export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        completed: v.boolean(),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        const todo = await ctx.db.get(args.id);
        if (todo?.userId !== user.tokenIdentifier) {
            throw new Error("Unauthorized action")
        }
        await ctx.db.patch(args.id, {
            completed: args.completed,
        });
    },
});

export const removeTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        const user = await requireUser(ctx);
        const todo = await ctx.db.get(args.id);
        if (todo?.userId !== user.tokenIdentifier) {
            throw new Error("Unauthorized action")
        }
        await ctx.db.delete(args.id);
    },
});

export const createManyTodos = internalMutation({
    args: {
        todos: v.array(v.object({ title: v.string(), description: v.string() })),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        args.todos.forEach(async (todo) => {
            await ctx.db.insert("todos", {
                title: todo.title,
                description: todo.description,
                completed: false,
                userId: args.userId,
            });
        });
    },
});