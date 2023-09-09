import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  Typography,
  Container,
  Card,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  CardContent,
} from "@mui/material";
import { StoreData } from "../store/model";
import { Post } from "../store/model";
import { Comment } from "../store/model";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const user = useSelector((state: StoreData) => state.auth.user);

  console.log("user", user);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const postsAPI = process.env.REACT_APP_API_URL_POSTS;
  const commentsAPI = process.env.REACT_APP_API_URL_COMMENTS;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch(postsAPI as string);
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch comments
        const commentsResponse = await fetch(commentsAPI as string);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [commentsAPI, postsAPI]);

  // Calculate the index of the first and last post to display on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to change the current page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: 20, backgroundColor: "#e0e0e0" }}>
        <Typography variant="h5" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard. Here's a list of posts and their comments:
        </Typography>
        <div
          style={{
            marginTop: 20,
            backgroundColor: "#e0e0e0",
          }}
        >
          {currentPosts.map((post: Post) => (
            <Card key={post.id} style={{ marginTop: 20, padding: 20 }}>
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  User ID: {post.userId}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  style={{ marginBottom: 10 }}
                >
                  {post.body}
                </Typography>

                <Divider />

                <Typography
                  color="textSecondary"
                  variant="body1"
                  style={{ marginTop: 10 }}
                >
                  Comments:{" "}
                  {
                    comments.filter(
                      (comment: Comment) => comment.postId === post.id
                    ).length
                  }
                </Typography>
                <List>
                  {comments
                    .filter((comment: Comment) => comment.postId === post.id)
                    .map((comment: Comment) => (
                      <ListItem key={comment.id}>
                        <ListItemText
                          primary={comment.email}
                          secondary={comment.body}
                        />
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Pagination Buttons */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => paginate(currentPage - 1)}
            style={{ margin: "5px" }}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
            (_, index) => (
              <span
                key={index}
                className={currentPage === index + 1 ? "selected" : ""}
                onClick={() => paginate(index + 1)}
                style={{ margin: "5px", cursor: "pointer", color: "#0080FF" }}
              >
                {index + 1}
              </span>
            )
          )}
          <Button
            variant="outlined"
            onClick={() => paginate(currentPage + 1)}
            style={{ margin: "5px" }}
            disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
          >
            Next
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Dashboard;
