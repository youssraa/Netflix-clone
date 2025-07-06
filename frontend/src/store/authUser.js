import {create} from "zustand";
import axios from "axios";
import {toast} from "react-hot-toast"
export const useAuthStore = create((set)=>({
    user : null ,
    isSigningUp : false ,
    isCheckingAuth : true ,
    isLoggingIn : false ,
    isLoggingOut : false ,
    signup : async (credentials)=>{
       set({isSigning : true}) ;
        try {
            const response = await axios.post("/api/v1/auth/signup",credentials)
            set({user :response.data.user , isSigningUp :false})
            toast.success("Account created successfully") 
        } catch (error) {
            toast.error(error.response.data.message || "an error occured ") ;
              set({user :null , isSigningUp :false})
        }
    } ,
    login : async (credentials)=>{
        set({ isLogging : true});
        try {
            const response = await axios.post("/api/v1/auth/login",credentials);
            set({user : response.data.user ,isLogging : false})
             toast.success("Logged ") ;
        } catch (error) {
               toast.error(error.response.data.message || "an error occured ") ;
              set({user :null , isLogging :false})
        }
        
    } ,
    logout : async ()=>{
        set({isLoggingOut : true})
        try {
            const response = await axios.post("/api/v1/auth/logout")
            set({user :null , isLoggingOut : false })
            toast.success('logged out successfuly')
        } catch (error) {
            set({isLoggingOut : false}) ;
            toast.error(error.response.data.message || "Logout failed ");
        }

    } ,
    authCheck: async () => {
		set({ isCheckingAuth: true });
           console.log("🔐 Checking auth...");
		try {
			const response = await axios.get("/api/v1/auth/authCheck");

			set({ user: response.data.user, isCheckingAuth: false });
         
            
console.log("✅ Auth done, setting isCheckingAuth: false");
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			// toast.error(error.response.data.message || "An error occurred");
		}
	},
}))