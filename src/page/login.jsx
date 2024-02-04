// import { Typography, Grid, Button } from "@mui/material";
// import React, { useState } from "react";
// import "../css/style.css";
// import { TextField, Box, InputAdornment } from "@mui/material";
// import makeStyles from "@mui/styles/makeStyles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       // margin: theme.spacing(1),
//       width: "25ch",
//     },
//     "& label.Mui-focused": {
//       color: "#121212",
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "#121212",
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "#121212",
//       },
//       "&:hover fieldset": {
//         borderColor: "#121212",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#121212",
//       },
//     },
//   },
// }));

// const Login = () => {
//   const classes = useStyles();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!name || !email) {
//       setError(true);
//     } else {
//       setError(false);
//       // Handle form submission logic here
//     }
//   };

//   const handleChangeName = (event) => {
//     setName(event.target.value);
//     setError(false); // Reset error when user types
//   };

//   const handleChangeEmail = (event) => {
//     setEmail(event.target.value);
//     setError(false); // Reset error when user types
//   };
//   return (
//     <Grid className="signupBox">
//       <Grid item xs={12} md={6} className="signupBox-1">
//         <Typography variant="h4" align="left" marginBottom={2}>
//           Sign Up
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Box sx={{ "& > :not(style)": { marginBottom: 2 } }}>
//             <TextField
//               InputLabelProps={{
//                 sx: {
//                   color: "#121212",
//                 },
//               }}
//               className={classes.root}
//               //    sx={{ input: { color: 'black' } }}
//               label="Name"
//               variant="standard"
//               fullWidth
//               value={name}
//               onChange={handleChangeName}
//               error={error && !name}
//               helperText={error && !name ? "Name is required" : ""}
//             />
//             <TextField
//               InputLabelProps={{
//                 sx: {
//                   color: "#121212",
//                 },
//               }}
//               className={classes.root}
//               sx={{ input: { color: "black" } }}
//               label="User Name"
//               variant="standard"
//               fullWidth
//               value={email}
//               onChange={handleChangeEmail}
//               error={error && !email}
//               helperText={error && !email ? "Email is required" : ""}
//             />
//             <TextField
//               className={classes.root}
//               sx={{ input: { color: "black" } }}
//               InputLabelProps={{
//                 sx: {
//                   color: "#121212",
//                 },
//               }}
//               label=" Email"
//               variant="standard"
//               fullWidth
//               value={email}
//               onChange={handleChangeEmail}
//               error={error && !email}
//               helperText={error && !email ? "Email is required" : ""}
//             />
//             <TextField
//               className={classes.root}
//               InputLabelProps={{
//                 sx: {
//                   color: "#121212",
//                 },
//               }}
//               sx={{ input: { color: "black" } }}
//               label="Password"
//               variant="standard"
//               fullWidth
//               value={email}
//               onChange={handleChangeEmail}
//               error={error && !email}
//               helperText={error && !email ? "Email is required" : ""}
//             />
//             <div>
//               <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                 <TextField
//                   type="file"
//                   inputProps={{ accept: "image/*" }}
//                   //   onChange={handleFileChange}
//                 />
//                 <Button
//                   variant="standard"
//                   color="primary"
//                   //   onClick={handleUpload}
//                   //   disabled={!selectedFile}
//                   //   startIcon={<CloudUpload />}
//                 >
//                   Upload
//                 </Button>
//               </Box>
//             </div>
//           </Box>
//           <Box style={{ display: "flex", justifyContent: "right" }}>
//             <Button
//               type="submit"
//               style={{
//                 borderColor: "#121212",
//                 backgroundColor: "#121212",
//                 color: "#fff",
//                 justifyContent: "right",
//               }}
//               variant="outlined"
//             >
//               Sign up
//             </Button>
//           </Box>
//         </form>
//       </Grid>
//       <Grid item xs={12} md={6} className="signupBox-2">
//         <Typography variant="h3" align="left" style={{ paddingBottom: "20px" }}>
//           Welcome to SocialSphere!
//         </Typography>
//         <Typography variant="p" align="left" style={{ paddingBottom: "30px" }}>
//           Join our community and connect with friends, family, and people around
//           the world.
//         </Typography>

//         <Typography style={{ paddingBottom: "30px" }}>
//           If you don't have an account yet, you can register below:
//         </Typography>
//         <Button
//           type="submit"
//           style={{
//             borderColor: "#ffffff",
//             backgroundColor: "#121212",
//             color: "#fff",
//             justifyContent: "right",
//           }}
//           variant="outlined"
//         >
//           Sign up
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

// export default Login;
