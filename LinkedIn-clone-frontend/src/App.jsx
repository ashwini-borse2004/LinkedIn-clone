import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/auth/LoginPage";
import SignUpPage from "./Pages/auth/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import NotificationsPage from "./Pages/NotificationsPage";
import NetworkPage from "./Pages/NetworkPage";
import PostPage from "./Pages/PostPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await axiosInstance.get("/auth/me");
				return res.data;
			} catch (err) {
				if (err.response && err.response.status === 401) {
					return null;
				}
				toast.error(err.response.data.message || "Something went wrong");
			}
		},
	});

	if (isLoading) return null;

	return (
		<Layout>
			<Toaster />
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />} />
				<Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
				<Route path='/posts/:postId' element={authUser ? <PostPage /> : <Navigate to={"/login"} />} />
				<Route path='/profile/:username' element= {authUser? <ProfilePage/> :  <Navigate to={"/login"} />} />

			</Routes>
		</Layout>
	);
}

export default App;

// <Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />} />
//<Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />