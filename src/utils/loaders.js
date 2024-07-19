import { redirect } from "react-router-dom";
import { DOMAIN } from "./global";
import { fetchData } from "./jsonServer";

export const getAccessToken = ()=>{
    return localStorage.getItem('user_access_token'); 
};


const userIsAuthenticated = async()=>{
 const accessToken = getAccessToken();
 if(!accessToken)return false; // if the user has no access token then we return early
 
 const response = await fetchData(DOMAIN + '/api/check-token/', {auth:true, returnResponse:true})
 if(response != null && !response.ok)return false;
 return true; // all checks have passed (shouldn't return true over here but for development we need it so we can work on the page)
};

// * set authentication to be used for conditional rendering which depends on user authentication
const setAuthentication = (value)=>{
    localStorage.setItem('is_authenticated', value);
}

// * For conditional rendering
export const isAuthenticated = () =>{
    return localStorage.getItem('is_authenticated');
}

// * runs before the homepage loads completely
export const homeLoader = async ({params}) =>{
    const username = params.username; 
    const response = await fetchData(DOMAIN + `/api/check-username/?username=${username}`, {returnResponse:true})
    if(response != null && !response.ok)return redirect('/test');
    setAuthentication(false); // assume user is not authenticated yet
    if(!await userIsAuthenticated())return redirect('/login');

    setAuthentication(true); 
    localStorage.setItem('get_notes_for', username);
    return null;
}; 


export const editLoader = async ({request})=>{
// setAuthentication(false);
const url = new URL(request.url); 
if(url.searchParams.get('add_note'))return null;
const noteId = url.searchParams.get('note_id'); 
console.log(noteId);

const note = await fetchData(DOMAIN + `/api/get-notes/`+ noteId, {auth:true}); 
 return note || [];
};