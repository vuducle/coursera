import React, { useState, useEffect } from 'react';
import {Container, SimpleGrid, Box, Text, Heading, Image} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Outlet} from "react-router-dom";
import Dashboard from './Dashboard';

export default function Dishes() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(false)
  const path = "https://localhost:3443/"
  async function getDishes() {
    setLoading(true)
    const respose = await fetch("https://localhost:3443/dishes")
    const dishesR = await respose.json()
    setDishes(dishesR)
    console.log(dishesR);
    setLoading(false)
  }

  function printStars(comment) {
      const arr = new Array(comment.rating).fill(0);
      // console.log(arr);
      return arr.map(() => {
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
          </svg>;
      });
  }

  useEffect(() => {
    getDishes()
  }, [])

  return (
    <div>
      <Container maxW="1620px">
        {loading ? (
        <p>Gigachad is loading...</p>
      ) : (
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
          {dishes.map(item => (
            <React.Fragment>
              <Box bgColor="blue.100" key={item._id} p={4}>
                <Box >
                  <Heading as="h4" pb={4}>

                    {item.name}
                  </Heading>
                  
                  <Image src={path + item.image} alt={item.name} pb={4}/>
                  <Text as="i" mt={4}>
                    {item.description}
                  </Text>
                  <Text mb={4}>
                  <span className='item-d'>
                    Price: {item.price} €
                  </span>
                  </Text>
                </Box>
               <Box bgColor="white" p={2}>
                  <div>
                    {
                      item.comments.map((comment, i) => {
                        return (
                          <div key={`${i}_comment`}>
                            <div className="comment-avater">
                              {comment.author.lastname}, {comment.author.firstname}
                            </div>
                            <div className='item-d'>
                              <Text as="i">
                              {comment.comment}
                              </Text>
                            </div>
                            <Text>
                              <div className="rating">
                                Rating: {printStars(comment)}
                              </div>
                            </Text>
                          </div>
                        )
                      })
                    }
                  </div>
                </Box>
              </Box>
            </React.Fragment>
          ))}
        </SimpleGrid>
      )}
      </Container>
      <Outlet/>
    </div>
  )
}
