import React, { useState, useEffect } from 'react';
import axios from '../Axios/axios';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersWithTasks = async () => {
      setLoading(true); // Set loading to true when the effect runs
      try {
        const response = await axios.get('/admin/users-tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // Filter out any user with the role of 'admin' if necessary
        const filteredUsers = response.data.filter(user => user.role !== 'admin');
        setUsers(filteredUsers);
        console.log('Filtered Users:', filteredUsers); // For debugging
      } catch (error) {
        console.error('Error fetching user tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithTasks();
  }, []);
// useEffect(() => {
//     // Define an async function inside the effect
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:8000/api/admin/users-tasks', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//           },
//         });
//         console.log(response.data); // This should show the array of users
//         setUsers(response.data);
//       } catch (error) {
//         console.error('There was an error!', error);
//       }
//     }
    
//     // Call the async function
//     fetchData();
//   }, []); // The empty array ensures this effect only runs once on mount
  

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Admin Dashboard
      </Typography>
      {users.length > 0 ? (
        users.map((user) => (
          <Paper key={user._id} elevation={3} sx={{ my: 2 }}>
            <Typography variant="h4" sx={{ my: 2 }}>
              {user.name}
            </Typography>
            {user.tasks && user.tasks.length > 0 ? (
              <TableContainer component={Paper}>
                <Table aria-label="user tasks table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.tasks.map((task) => (
                      <TableRow key={task._id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell align="right">{task.description}</TableCell>
                        <TableCell align="right">
                          {task.completed ? 'Completed' : 'Active'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography sx={{ my: 2 }}>No tasks found for this user.</Typography>
            )}
          </Paper>
        ))
      ) : (
        <Typography>No users found.</Typography>
      )}
    </Container>
  );
}

export default Admin;
