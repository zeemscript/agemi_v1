"use client";
import Button from "../atoms/form/Button";
export default function AuthNavButtons() {
    const isAuthenticated  = false;
    return isAuthenticated ? (
        <Button to="/dashboard" wide round className="bg-accent text-white px-10 py-3 animate-in-out transition-all">
            Dashboard
        </Button>
    ) : (
        <>
            <div className="flex items-center gap-5 ">
                <Button
                    wide
                    round
                    to="/login"
                    className="bg-accent text-white px-10 py-3 animate-in-out transition-all "
                >
                    Login
                </Button>
                <Button to="/signup" wide round
                        className="bg-transparent border border-cyan-500 hover:bg-cyan-500/10 text-white px-10 py-3 animate-in-out transition-all"    >
                    Sign up
                </Button>
            </div>

        </>
    );
}
