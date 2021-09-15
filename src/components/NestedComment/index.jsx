import React from 'react';

const NestedComment = () => {
  const commentData = {
    title: "Test lev comment",
    comments: [
      {
        id: 1,
        text: "Test lev 1.1.",
        children: [
          {
            id: 2,
            text: "Test lev 1.2.",
            children: [
              {
                id: 3,
                text: "Test lev 1.3.",
                children: [
                  {
                    id: 5,
                    text: "Test lev 1.4.",
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 4,
        text: "Test lev 2.1.",
        children: []
      }
    ]
  }

  function Comment({ comment }) {
    const nestedComments = (comment.children || []).map(comment => {
      return <Comment key={comment.id} comment={comment} type="child" />
    })

    return (
      <div style={{ "marginLeft": "25px", "marginTop": "10px" }}>
        <div>{comment.text}</div>
        {nestedComments}
      </div>
    )
  }

  return (
    <div>
      {
        commentData.comments.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} />
          )
        })
      }
    </div>
  )
}

export default NestedComment