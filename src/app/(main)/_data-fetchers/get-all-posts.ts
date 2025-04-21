import { prisma } from "@/lib/prisma";
import { SortOrderType } from "@/types";
import { Prisma } from "@prisma/client";

/* export const getAllPosts = async (sort: SortOrderType) => {
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      postLikes: true,
      author: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: sort === "latest" ? "desc" : "asc",
    },
  });
  return {
    data,
  };
};
 */

type GetAllPostsParamsType = {
  sort: SortOrderType;
  searchQuery?: string;
};

export const getAllPosts = async ({
  sort,
  searchQuery,
}: GetAllPostsParamsType) => {
  // orderby
  const orderBy: Prisma.PostOrderByWithRelationInput = {
    createdAt: sort === "latest" ? "desc" : "asc",
  };

  // construct the where clause dynamically
  let where: Prisma.PostWhereInput = {};

  if (searchQuery && searchQuery.trim() !== "") {
    // const formattedQuery = searchQuery.trim().split(/\s+/).join(" | ");
    const formattedQuery = searchQuery.trim();

    where = {
      OR: [
        {
          title: {
            contains: formattedQuery,
            mode: "insensitive",
          },
        },
        {
          body: {
            contains: formattedQuery,
            mode: "insensitive",
          },
        },
        {
          author: {
            OR: [
              {
                name: {
                  contains: formattedQuery,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: formattedQuery,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      ],
    };
  }

  // fetch data
  const data = await prisma.post.findMany({
    where,
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          postLikes: true,
        },
      },
    },
    orderBy,
  });

  const processedData = data.map((post) => ({
    ...post,
    likesCount: post._count.postLikes,
  }));

  return {
    data: processedData,
  };
};

export type FetchedPostType = Prisma.PromiseReturnType<
  typeof getAllPosts
>["data"][number];
