import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "~/components/layout/layout";


export default function Home() {
  return (
    <Layout mainClassName="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ffffff]">



<div className="container flex flex-col items-center justify-center mt-5 max-w-[100%]">
		<div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
			<form action=""  method="POST">	
				<h1 className="text-center text-3xl font-fancy p-5">Tú Perfil</h1>
				<div className="row p-4">
					<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
						<div className="form-group">
							<label className="profile_details_text font-smart text-lg">Nombre:</label>
							<input type="text" name="first_name" className="form-control border-solid rounded shadow-lg p-3 m-3" value="" disabled/>
							
						</div>
					</div>
				</div>
				<div className="row p-4">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="form-group">
							<label className="profile_details_text font-smart text-lg">Correo:</label>
							<input type="email" name="email" className="form-control border-solid rounded shadow-lg p-3 m-3" value="" disabled></input>
							
						</div>
					</div>
				</div>
				<div className="row p-4">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="form-group">
							<label className="profile_details_text font-smart text-lg">RFID:</label>
							<input type="tel" name="phone" className="form-control border-solid rounded shadow-lg p-3 m-3" value="" />
							
						</div>
					</div>
				</div>
                <div className="row p-4">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="form-group">
							<label className="profile_details_text font-smart text-lg">Temperatura Minima Preferencial:</label>
							<input type="number" name="mintemp" min="16" max="25" className="form-control border-solid rounded shadow-lg p-3 m-3" value="" required/>
						</div>
					</div>
				</div>
				<div className="row p-4">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="form-group">
							<label className="profile_details_text font-smart text-lg">Temperatura Maxima Preferencial:</label>
							<input type="number" name="maxtemp" min="16" max="27" className="form-control border-solid rounded shadow-lg p-3 m-3" value="" required/>
						</div>
					</div>
				</div>
				<div className="row p-4">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="form-group">
							<label className="profile_details_text font-smart text-lg">Fecha de Nacimiento:</label>
							<input type="date" name="birthday" className="form-control shadow-lg p-3 m-3" value="" required/>
						</div>
					</div>
				</div>
				<div className="row p-4">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<div className="form-group">
							<label className="profile_details_text font-smart text-lg">Genero:</label>
							<select name="gender" className="form-control shadow-lg p-3 m-3" value="" required>
								<option value="Male">Mujer</option>
								<option value="Female">Hombre</option>
							</select>
						</div>
					</div>
				</div>
			
	
				<div className="row p-4">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
						<div className="form-group">
							<input type="submit" className="btn btn-success rounded-lg border-2 m-3 shadow-lg p-5 bg-blue-400 font-smart text-lg" value="Submit"/>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

    
<div className="container flex flex-col items-center justify-center mt-5 max-w-[100%]">
<h1 className="text-center text-3xl font-fancy p-5">Oficina</h1>
</div>



    </Layout>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
