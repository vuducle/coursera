import React, { useState, useEffect } from 'react';
import {Container, SimpleGrid, Box} from "@chakra-ui/react"

export default function Dishes() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(false)
  const path = "https:localhost:3443/"
  async function getDishes() {
    setLoading(true)
    const respose = await fetch("https:localhost:3443/dishes")
    const dishesR = await respose.json()
    setDishes(dishesR)
    setLoading(false)
  }

  useEffect(() => {
    getDishes()
  }, [])

  return (
    <div>
      <Container>
        {loading ? (
        <p>Loading ...</p>
      ) : (
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
          {dishes.map(item => (
            <React.Fragment>
              <Box key={item._id}>
                <span>
                  {item.name}
                </span>
                <img src={path + item.image} alt="" />
                <span>
                  {item.description}
                  
                </span>
                <span>
                  {item.price} €
                </span>
                <div>
                  {
                    item.comments.map((comment, i) => {
                      return (
                        <div key={`${i}_comment`}>
                          <div className="comment-avater">
                            {comment.author.lastname}, {comment.author.firstname}
                          </div>
                          <div>
                            {comment.comment}
                          </div>
                          <div className="rating">
                            Rating: {comment.rating}/5
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </Box>
            </React.Fragment>
          ))}
        </SimpleGrid>
      )}
      </Container>
    </div>
  )
}
