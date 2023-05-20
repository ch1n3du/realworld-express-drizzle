import {pgTable, serial, text, date } from "drizzle-orm/pg-core";
import { db } from ".";
import { eq } from "drizzle-orm";
import { users } from "./schema";


export async function insertUser(
    username: string,
    email: string,
    password: string
) {
    try {
     let rows = await db.insert(users)
        .values({username, email})
        .returning({
            username: users.username,
            email: users.email,
            bio: users.bio,
            image: users.image,
        });

        return rows[0];
    } catch (error) {
        return null;
    }
}
    

export async function getUserByUsername(username: string) {
    let rows = await db.select({
        username: users.username,
        email: users.email,
        bio: users.bio,
        image: users.image,
    })
    .from(users)
    .where(eq(users.username, username));

    if (rows.length === 0) {
        return null;
    } else {
        return rows[0];
    }
}

export async function getUserByEmail(email: string) {
    let rows = await db.select({
        username: users.username,
            email: users.email,
            bio: users.bio,
            image: users.image,
    })
    .from(users)
    .where(eq(users.email, email));

    if (rows.length === 0) {
        return null;
    } else {
        return rows[0];
    }
}

export async function getUserPassword(email: string): Promise<string | null> {
    let rows = await db.select({
        password: users.password
    }).from(users);
    if (rows.length === 0) {
        return null;
    } else {
        return rows[0].password;
    }
}
