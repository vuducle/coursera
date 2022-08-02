import React, { useState, useEffect } from 'react';
import {Container, SimpleGrid, Box, Text, Heading} from "@chakra-ui/react"

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
      <Container maxW="1620px">
        {loading ? (
        <p>Loading ...</p>
      ) : (
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
          {dishes.map(item => (
            <React.Fragment>
              <Box key={item._id}>
                <Box bgColor="green.500">
                  <Heading as="h4">

                    {item.name}
                  </Heading>
                  
                  <img src={path + item.image} alt="" />
                  <Text as="i">
                    {item.description}
                  </Text>
                  <span className='item-d'>
                    {item.price} €
                  </span>
                </Box>
               
                <div>
                  {
                    item.comments.map((comment, i) => {
                      return (
                        <div key={`${i}_comment`}>
                          <div className="comment-avater">
                            {comment.author.lastname}, {comment.author.firstname}
                          </div>
                          <div className='item-d'>
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
