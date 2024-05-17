import { db } from "./prisma";

export const getContacts = async (query: string, currentPage: number) => {
  try {
    // const contacts = await
    // const contacts = await db.contact.findMany();
    const contacts = await db.contact.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              // mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              // mode: "insensitive",
            },
          },
        ],
      },
    });
    return contacts;
  } catch (error) {
    throw new Error("Failed o fetch contact data");
  }
};

export const getContactById = async (id: string) => {
  try {
    // const contacts = await
    const contact = await db.contact.findUnique({
      where: { id },
    });
    return contact;
  } catch (error) {
    throw new Error("Failed o fetch contact data");
  }
};
