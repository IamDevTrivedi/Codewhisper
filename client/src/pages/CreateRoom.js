import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavBarHome";
import { useContext, useState } from "react";
import languages from "../Constants/languages";
import { message } from "antd";
import { AppContext } from "../Context/AppContext";

function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const [roomLanguage, setRoomLanguage] = useState("");
    const [loading, setLoading] = useState(false);


    const { createRoom } = useContext(AppContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "roomName") {
            setRoomName(value);
        } else if (name === "roomLanguage") {
            setRoomLanguage(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Creating room:", { roomName, roomLanguage });

        try {
            setLoading(true);

            const response = await createRoom({ roomName, roomLanguage });

            if (response) {
                navigate(`/room/${response.roomUUID}`);
            }

        } catch (error) {
            console.error(error);
            message.error("An error occurred. Please try again later.");
        }
        finally {
            setLoading(false);
        }







    };

    document.title = "Create Room | CodeWhisper";

    return (
        <>
            <Navbar />

            <div className="bg-black min-h-screen flex items-center justify-center px-3">
                <div className="border border-neutral-600 max-w-md w-full mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
                    <h2 className="font-bold text-xl text-neutral-200">
                        Create a New Room
                    </h2>
                    <p className="text-sm max-w-sm mt-2 text-neutral-300">
                        Set up your coding room in CodeWhisper
                    </p>
                    <form className="my-8" onSubmit={handleSubmit}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="roomName">Room Name</Label>
                            <Input
                                id="roomName"
                                name="roomName"
                                placeholder="Gotham's City Coding Room"
                                type="text"
                                value={roomName}
                                onChange={handleChange}
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="language">Programming Language</Label>
                            <select
                                id="roomLanguage"
                                name="roomLanguage"
                                value={roomLanguage}
                                onChange={handleChange}
                                required
                                className="flex h-10 w-full rounded-md bg-neutral-800 text-gray-100 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Select a language</option>
                                {languages.map((lang) => (
                                    <option key={lang.id} value={lang.id}>
                                        {lang.roomLanguage}
                                    </option>
                                ))}
                            </select>
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium  shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit">
                            {loading ? "Creating Room..." : "Create Room"}
                            <BottomGradient />
                        </button>
                    </form>

                    <div className="text-center text-neutral-300">
                        Already have a room?{" "}
                        <Link to="/room/join" className="text-neutral-200 font-medium hover:text-white">
                            Join Room
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

export default CreateRoom;