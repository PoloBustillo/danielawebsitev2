"use client";
import { db } from "@/lib/firebase-config";
import { CommentType, CommentTypeExtended } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
  user,
} from "@nextui-org/react";
import { useToast } from "@/components/ui/use-toast";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { AtSign, IdCard, SendHorizonal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { on } from "events";

const Comments = ({ blogId }: { blogId: string }) => {
  const { data: session, status, update: sessionUpdate } = useSession();
  const [comment, setComment] = useState("");
  const [commentToBeEdited, setCommentToBeEdited] =
    useState<CommentTypeExtended>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [reply, setReply] = useState("");
  const { toast } = useToast();
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
        if ((doc.data().blogId as DocumentReference).id === blogId)
          response.push({ ...doc.data(), id: doc.id });
      });
      //Convert data to be handle in state
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
          let replies = comment.replies.map((reply: DocumentReference) => {
            return reply.id;
          });
          commentsLikes[comment.id] = comment.likes;
          return {
            id: comment.id,
            username: userData!.name,
            userId: comment.userId.id,
            userAvatar: userData!.image,
            userEmail: userData!.email,
            status: comment.status,
            commentText: comment.commentText,
            likes: comment.likes,
            replies: replies,
            created_on: comment.created_on.toDate(),
            isReply: comment.isReply,
          };
        })
    );
    setLikes(commentsLikes);
    return data;
  };

  const deleteComment = async (commentId: string) => {
    const docRef = doc(db, "comments", commentId);
    await updateDoc(docRef, {
      status: "deleted",
    });
    let newComments = comments.filter((comment) => comment.id !== commentId);
    setComments(newComments);
  };

  const handleReply = async (e: any, commentId: any) => {
    e.preventDefault();
    const userRef = doc(db, "users", session?.user.id!);
    const blogRef = doc(db, "blog", blogId!);
    const commentRef = doc(db, "comments", commentId!);

    const replyToSave = {
      userId: userRef!,
      blogId: blogRef!,
      commentText: reply,
      replies: [],
      likes: [],
      status: "active",
      created_on: new Date(),
      isReply: true,
    } as any;
    const replyRef = collection(db, "comments");
    const docRef = await addDoc(replyRef, replyToSave);

    await updateDoc(commentRef, {
      replies: arrayUnion(docRef),
    });

    comments
      .find((comment) => comment.id === commentId)
      ?.replies.push(docRef.id);
    const newReply = {
      id: docRef.id,
      username: session?.user.name!,
      userAvatar: session?.user.image!,
      userId: session?.user.id!,
      userEmail: session?.user.email!,
      commentText: reply,
      likes: [],
      replies: [],
      status: "active",
      isReply: true,
      created_on: new Date(),
    } as CommentTypeExtended;
    let newComments = [...comments, newReply];
    setComments(newComments);
    setReply("");
  };

  const updateComment = async (commentId: string) => {
    const docRef = doc(db, "comments", commentId);
    await updateDoc(docRef, {
      commentText: comment,
    });
    let newComments = comments.map((commentObj) => {
      if (commentObj.id === commentId) {
        return {
          ...commentObj,
          commentText: comment,
        };
      }
      return commentObj;
    }) as CommentTypeExtended[];

    setComments(newComments);
    setComment("");
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
      userEmail: session?.user.email!,
      userId: session?.user.id!,
      commentText: comment,
      likes: [],
      replies: [],
      status: "active",
      isReply: false,
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setComment("");
        }}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edita tu comentario
              </ModalHeader>
              <ModalBody>
                <div>
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label className="sr-only">Tu comentario</label>
                    <textarea
                      disabled={status !== "authenticated"}
                      id="comment"
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      onChange={(e) => setComment(e.target.value)}
                      value={comment as string}
                      placeholder={
                        status !== "authenticated"
                          ? "Inicia sesión para comentar por favor."
                          : "Escribe un comentario"
                      }
                      required
                    ></textarea>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    updateComment(commentToBeEdited?.id!);
                    onClose();
                  }}
                  isDisabled={status !== "authenticated"}
                  variant="solid"
                  color="primary"
                  className="flex float-right focus:ring-primary-200 dark:focus:ring-primary hover:bg-primary"
                >
                  Actulizar Comentario
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
            return comment.status === "active" && !comment.isReply;
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
                        <Tooltip
                          showArrow
                          placement="left"
                          content={
                            <>
                              <div className="flex flex-row">
                                <AtSign></AtSign>
                                {comment.userEmail}
                              </div>
                              <div className="flex flex-row">
                                <IdCard></IdCard>
                                {comment.id}
                              </div>
                            </>
                          }
                          classNames={{
                            base: [
                              // arrow color
                              "before:bg-neutral-400 dark:before:bg-white",
                            ],
                            content: [
                              "py-2 px-4 shadow-xl",
                              "text-black bg-gradient-to-br from-white to-neutral-400",
                            ],
                          }}
                        >
                          <Avatar
                            isBordered
                            className="mr-2 w-10 h-10 rounded-full"
                            color="secondary"
                            name={comment.username}
                            size="md"
                            src={comment.userAvatar}
                          />
                        </Tooltip>
                        {comment.username}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time>
                          {(comment?.created_on as Date).toLocaleDateString()} -{" "}
                          {(comment?.created_on as Date).toLocaleTimeString()}
                        </time>
                      </p>
                    </div>
                    <Popover
                      shouldCloseOnBlur={true}
                      placement="bottom"
                      showArrow
                    >
                      <PopoverTrigger>
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
                      </PopoverTrigger>
                      <PopoverContent
                        className={cn(
                          "z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        )}
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownMenuIconHorizontalButton"
                        >
                          {session?.user?.id === comment.userId && (
                            <>
                              <li
                                onClick={() => {
                                  setCommentToBeEdited(comment);
                                  setComment(comment.commentText);
                                  onOpen();
                                }}
                                className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Editar
                              </li>

                              <li
                                onClick={() => {
                                  deleteComment(comment.id);
                                }}
                                className=" cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Eliminar
                              </li>
                            </>
                          )}
                          <li
                            onClick={() => {
                              toast({
                                variant: "destructive",

                                title: "Gracias por tu retroalimentación",
                                description:
                                  "Tu reporte ha sido enviado a moderación",
                              });
                            }}
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                          >
                            Reportar
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
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
                    <form className="mb-6">
                      <div className=" py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label className="sr-only">Tu comentario</label>
                        <textarea
                          disabled={status !== "authenticated"}
                          id="comment"
                          value={reply}
                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                          onChange={(e) => setReply(e.target.value)}
                          placeholder={replyData.placeholder}
                          required
                        ></textarea>
                        <div className="flex w-full justify-end relative">
                          <Button
                            isIconOnly
                            onClick={(e) => {
                              if (reply != "") {
                                handleReply(e, comment.id);
                                setReplyData({
                                  commentId: "",
                                  placeholder: "",
                                });
                              }
                            }}
                            type="submit"
                            isDisabled={status !== "authenticated"}
                            variant="solid"
                            color="primary"
                            className="focus:ring-primary-200 dark:focus:ring-primary hover:bg-primary"
                          >
                            <SendHorizonal></SendHorizonal>
                          </Button>
                        </div>
                      </div>
                    </form>
                  )}
                  {comment.replies &&
                    comment.replies.map((reply) => {
                      let replyComment = comments.find(
                        (c: CommentTypeExtended) => c.id === reply
                      );

                      if (replyComment) {
                        const likesCount = likes[replyComment?.id!]
                          ? likes[replyComment?.id!].length
                          : 0;
                        const liked = likes[replyComment?.id!]
                          ? likes[replyComment?.id!].includes(
                              session?.user?.id!
                            )
                          : false;
                        return (
                          <div key={replyComment?.id}>
                            <footer className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                  <Tooltip
                                    showArrow
                                    placement="left"
                                    content={
                                      <>
                                        <div className="flex flex-row">
                                          <AtSign></AtSign>
                                          {replyComment.userEmail}
                                        </div>
                                        <div className="flex flex-row">
                                          <IdCard></IdCard>
                                          {replyComment.id}
                                        </div>
                                      </>
                                    }
                                    classNames={{
                                      base: [
                                        // arrow color
                                        "before:bg-neutral-400 dark:before:bg-white",
                                      ],
                                      content: [
                                        "py-2 px-4 shadow-xl",
                                        "text-black bg-gradient-to-br from-white to-neutral-400",
                                      ],
                                    }}
                                  >
                                    <Avatar
                                      isBordered
                                      className="mr-2 w-6 h-6 rounded-full"
                                      color="success"
                                      size="sm"
                                      src={replyComment?.userAvatar}
                                      name={replyComment?.username}
                                    />
                                  </Tooltip>
                                  {replyComment?.username}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  <time
                                    dateTime="2022-02-12"
                                    title="February 12th, 2022"
                                  >
                                    {(
                                      replyComment?.created_on as Date
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {(
                                      replyComment?.created_on as Date
                                    ).toLocaleTimeString()}
                                  </time>
                                </p>
                              </div>
                              <Popover placement="bottom" showArrow>
                                <PopoverTrigger>
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
                                    <span className="sr-only">
                                      Comment settings
                                    </span>
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className={cn(
                                    "z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                  )}
                                >
                                  <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton"
                                  >
                                    {session?.user?.id ===
                                      replyComment?.userId && (
                                      <>
                                        <li
                                          onClick={() => {
                                            setCommentToBeEdited(replyComment);
                                            setComment(
                                              replyComment!.commentText
                                            );
                                            onOpen();
                                          }}
                                          className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                          Editar
                                        </li>

                                        <li
                                          onClick={() => {
                                            deleteComment(replyComment.id);
                                          }}
                                          className=" cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                          Eliminar
                                        </li>
                                      </>
                                    )}
                                    <li
                                      onClick={() => {
                                        toast({
                                          variant: "destructive",

                                          title:
                                            "Gracias por tu retroalimentación",
                                          description:
                                            "Tu reporte ha sido enviado a moderación",
                                        });
                                      }}
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                    >
                                      Reportar
                                    </li>
                                  </ul>
                                </PopoverContent>
                              </Popover>
                            </footer>

                            <p className="text-gray-500 dark:text-gray-400">
                              {replyComment?.commentText}
                            </p>
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
                                  handleLike(replyComment?.id!);
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
                        );
                      }
                    })}
                </article>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Comments;
