
interface LoginRequest {
  email: string,
  password:string
}

interface SignupRequest{
  username: string,
  email2: string,
  password2: string,
  state?:boolean
}

interface ResponseApi{
  ok: boolean,
  message: string,
  data?:any
  
}
interface ApiPlaceholder{
  userId: number,
  id: number,
  title: string,
  body: string
}

interface I_UserLogin { 
  id:number,
  email: string,
  password:string
}

interface I_Raza{
  id: number,
  name: string,
  description: string
}
interface I_NewRaza {
  nameraza: string;
  description: string;
}

interface I_ResUserLogin{
  status: boolean,
  message:string
}

interface I_DataHorario {
  name: string;
  hora_ini: string;
  hora_fin: string;
}

export {
  LoginRequest,
  SignupRequest,
  ResponseApi,
  ApiPlaceholder,
  I_UserLogin,
  I_Raza,
  I_NewRaza,
  I_ResUserLogin,
  I_DataHorario
}