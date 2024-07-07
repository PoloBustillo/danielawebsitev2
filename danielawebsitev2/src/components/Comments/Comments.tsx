"use client";
import { db } from "@/lib/firebase-config";
import { CommentType, CommentTypeExtended } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Comments = ({ blogId }: { blogId: string }) => {
  const { data: session, status, update: sessionUpdate } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentTypeExtended[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: string[] }>({});
  const { theme } = useTheme();
  const [replyData, setReplyData] = useState({
    commentId: "",
    placeholder: "",
  });

  useEffect(() => {
    (async () => {
      const collectionRef = collection(db, "comments");
      const docSnaps = await getDocs(collectionRef);

      let response: any = [];

      docSnaps.forEach((doc) => {
        response.push({ ...doc.data(), id: doc.id });
      });
      let reponse = await filterComments(response);
      setComments(reponse);
    })();
  }, []);

  const handleLike = async (commentId: string) => {
    const docRef = doc(db, "comments", commentId);
    const docSnap = await getDoc(docRef);
    let commentData = docSnap.data()! as CommentType;
    if (commentData.likes) {
      if (commentData.likes.includes(session?.user.id!)) {
        setLikes({
          ...likes,
          [commentId]: likes[commentId].filter(
            (likes) => !likes.includes(session?.user?.id!)
          ),
        });
        await updateDoc(docRef, {
          likes: commentData.likes.filter((id) => id !== session?.user.id),
        });
      } else {
        if (likes[commentId] === undefined) {
          setLikes({
            ...likes,
            [commentId]: [session?.user?.id!],
          });
        } else {
          setLikes({
            ...likes,
            [commentId]: [...likes[commentId], session?.user?.id!],
          });
        }

        await updateDoc(docRef, {
          likes: [...commentData.likes, session?.user.id],
        });
      }
    } else {
      setLikes({
        ...likes,
        [commentId]: [session?.user?.id!],
      });
      await updateDoc(docRef, {
        likes: [session?.user.id],
      });
    }
  };

  const filterComments = async (
    comments: CommentType[]
  ): Promise<CommentTypeExtended[]> => {
    let commentsLikes: { [key: string]: string[] } = {};
    let data = await Promise.all(
      comments
        .filter((comment: CommentType) => {
          return comment.status === "active";
        })
        .map(async (comment: CommentType) => {
          let userDoc = getDoc(comment.userId);
          let userData = (await userDoc).data();
          commentsLikes[comment.id] = comment.likes;
          return {
            id: comment.id,
            username: userData!.name,
            userAvatar: userData!.image,
            status: comment.status,
            commentText: comment.commentText,
            likes: comment.likes,
            created_on: comment.created_on.toDate(),
          };
        })
    );
    setLikes(commentsLikes);
    return data;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userRef = doc(db, "users", session?.user.id!);
    const blogRef = doc(db, "blog", blogId!);
    const commentToSave = {
      userId: userRef!,
      blogId: blogRef!,
      commentText: comment,
      replies: [],
      likes: [],
      status: "active",
      created_on: new Date(),
    } as any;
    const commentRef = collection(db, "comments");
    const docRef = await addDoc(commentRef, commentToSave);
    const newComment = {
      id: docRef.id,
      username: session?.user.name!,
      userAvatar: session?.user.image!,
      commentText: comment,
      likes: [],
      status: "active",
      created_on: new Date(),
    } as CommentTypeExtended;
    let newComments = [...comments, newComment];

    setComments(newComments);
    setComment("");
  };

  const showReply = (commentId: string) => {
    if (replyData.commentId !== commentId) {
      setReplyData({
        placeholder: `Respuesta a @${
          comments.find((c) => c.id === commentId)?.username
        }: `,
        commentId: commentId,
      });
    } else {
      setReplyData({
        placeholder: "",
        commentId: "",
      });
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <Modal backdrop={"transparent"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Responder a comentario de
              </ModalHeader>
              <ModalBody>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label className="sr-only">Tu comentario</label>
                  <textarea
                    value={comment}
                    disabled={status !== "authenticated"}
                    id="comment"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={
                      status !== "authenticated"
                        ? "Inicia sesión para comentar por favor."
                        : "Escribe un comentario"
                    }
                    required
                  ></textarea>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comentarios
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label className="sr-only">Tu comentario</label>
            <textarea
              value={comment}
              disabled={status !== "authenticated"}
              id="comment"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              onChange={(e) => setComment(e.target.value)}
              placeholder={
                status !== "authenticated"
                  ? "Inicia sesión para comentar por favor."
                  : "Escribe un comentario"
              }
              required
            ></textarea>
          </div>
          <Button
            type="submit"
            isDisabled={status !== "authenticated"}
            variant="solid"
            color="primary"
            className="flex float-right focus:ring-primary-200 dark:focus:ring-primary hover:bg-primary"
          >
            Postear Comentario
          </Button>
        </form>

        {comments
          .filter((comment) => {
            return comment.status === "active";
          })
          .sort((a, b) => {
            return (
              (b.created_on as Date).getTime() -
              (a.created_on as Date).getTime()
            );
          })
          .map((comment: CommentTypeExtended) => {
            const likesCount = likes[comment.id] ? likes[comment.id].length : 0;
            const liked = likes[comment.id]
              ? likes[comment.id].includes(session?.user?.id!)
              : false;
            return (
              <div
                key={comment.id}
                className="border-b-small border-dotted dark:border-[#e5e7eb4d] border-black "
              >
                <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={comment.userAvatar}
                          alt={comment.username}
                        />
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time>
                          {comment.created_on
                            ? (comment.created_on as Date).toLocaleDateString()
                            : "No date available"}
                        </time>
                      </p>
                    </div>
                    <button
                      id="dropdownComment1Button"
                      data-dropdown-toggle="dropdownComment1"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                      onClick={() => {}}
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                      <span className="sr-only">Comment settings</span>
                    </button>

                    <div
                      id="dropdownComment1"
                      className={cn(
                        "z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600",
                        "hidden"
                      )}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Remove
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {comment.commentText}
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      onClick={() => {
                        showReply(comment.id);
                      }}
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    >
                      <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      Responder
                    </button>
                    <div className="flex gap-2 w-[100%] content-end justify-end">
                      <Button
                        isIconOnly
                        variant={
                          theme == "dark" && !liked
                            ? "faded"
                            : theme == "light" && liked
                            ? "shadow"
                            : "bordered"
                        }
                        isDisabled={!session?.user}
                        onClick={() => {
                          handleLike(comment.id);
                        }}
                        className={cn(
                          "py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2",
                          liked
                            ? "text-green-600 border-green-600 bg-[#d3d3d375] dark:bg-transparent"
                            : "text-gray-400  border-gray-400"
                        )}
                      >
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          ></path>
                        </svg>
                      </Button>
                      <span
                        className={cn(
                          "py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2",
                          liked ? "text-green-600" : "text-gray-400"
                        )}
                      >
                        {likesCount}
                      </span>
                    </div>
                  </div>
                </article>
                <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                  {replyData.commentId === comment.id && (
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label className="sr-only">Tu comentario</label>
                      <textarea
                        disabled={status !== "authenticated"}
                        id="comment"
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={
                          status !== "authenticated"
                            ? "Inicia sesión para comentar por favor."
                            : "Escribe un comentario"
                        }
                        required
                      ></textarea>
                    </div>
                  )}
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="Jese Leos"
                        />
                        Jese Leos
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime="2022-02-12" title="February 12th, 2022">
                          Feb. 12, 2022
                        </time>
                      </p>
                    </div>
                    <button
                      id="dropdownComment2Button"
                      data-dropdown-toggle="dropdownComment2"
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                      <span className="sr-only">Comment settings</span>
                    </button>

                    <div
                      id="dropdownComment2"
                      className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Remove
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    Much appreciated! Glad you liked it ☺️
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    >
                      <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      Reply
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Comments;
