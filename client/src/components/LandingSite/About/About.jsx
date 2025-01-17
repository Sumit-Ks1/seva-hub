import { TeamCard } from "./TeamMember";
function About() {

  const ahad = {
    name: "Devyanshu Negi 23BCE10205",
    designation: "Full Stack Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };
  const danish = {
    name: "Gyanendra Thakur 23BCE10433",
    designation: "Frontened Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };
  const abubakar = {
    name: "Summit Kumar Singh 23BCE10226",
    designation: "Backend Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };
  const muneeb = {
    name: "Ayush Agarwal 23BCE10678",
    designation: "AI & ML Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };
  const arsal = {
    name: "Somil Asati 23BCE10364",
    designation: "DBMS, Designer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
  };

  return (
    <>
      <h1 className="font-bold text-white text-center text-5xl">
        Meet Our Team!
      </h1>
      <div className="py-20 sm:py-25 flex gap-10 flex-wrap justify-center align-center">
        <TeamCard member={ahad} />
        <TeamCard member={danish} />
        <TeamCard member={abubakar} />
        <TeamCard member={arsal} />
        <TeamCard member={muneeb} />
      </div>
    </>
  );
}
export { About };
