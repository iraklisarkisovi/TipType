import axios from "axios";

const key = process.env.NEXT_PUBLIC_CRUD_USER_API_KEY;  
const tipkey = process.env.NEXT_PUBLIC_CRUD_TIP_API_KEY;

export interface dataType {
  name: string;
  email: string;
  password: string;
};

export const Post = async (data: dataType[]) => {
  try {
    const res = await axios.post("https://crudapi.co.uk/api/v1/users", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    });
 
    return res.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || "Unknown error" };
  }
};

export const Get = async () => {
    const res = await axios.get("https://crudapi.co.uk/api/v1/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    });

    return res.data
}
 

export const PostTip = async (data: {}) => {
  try {
    const res = await axios.post("https://crudapi.co.uk/api/v1/users", [data], {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tipkey}`,
      },
    });
  
    return res.data
  }catch (error: any){
    console.error("API Error:", error.response?.data || error.message);
    return { success: false, error: error.response?.data || "Unknown error" };
  }
};

export const getTip = async () => {
  const res = await axios.get("https://crudapi.co.uk/api/v1/users", {
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${tipkey}`
    }
  })
    
  return res.data
}