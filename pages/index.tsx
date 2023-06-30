import Form from "@/components/Form"
import Header from "@/components/Header"
import PostFeed from "@/components/posts/PostFeed"
export default function Home() {
  return (
    <>
      <head>
        <title>clitter app</title>
      </head>
      <Header label={"Home"} />
      <Form placeholder="What Is Happening?" />
      <PostFeed  />
    </>
  )
}
