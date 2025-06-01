import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavBarHome";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");

  const handleChange = (e) => {
    setRoomId(e.target.value);
  };

  const navigate = useNavigate();

  const { joinRoom } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await joinRoom({ roomUUID: roomId });
    if (response) {
      navigate(`/room/${roomId}`);
    }
  };

  document.title = "Join Room | CodeWhisper";

  return (
    <>
      <Navbar />

      <div className="bg-black min-h-screen flex items-center justify-center px-3">
        <div className="border border-neutral-600 max-w-md w-full mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
          <h2 className="font-bold text-xl text-neutral-200">
            Join an Existing Room
          </h2>
          <p className="text-sm max-w-sm mt-2 text-neutral-300">
            Enter the Room ID to join a coding session
          </p>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="roomId">Room ID</Label>
              <Input
                id="roomId"
                name="roomId"
                placeholder="Enter Room ID"
                type="text"
                value={roomId}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit">
              Join Room &rarr;
              <BottomGradient />
            </button>
          </form>

          <div className="text-center text-neutral-300">
            Don't have a room?{" "}
            <Link to="/room/create" className="text-neutral-200 font-medium hover:text-white">
              Create Room
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ className, children }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default JoinRoom;

