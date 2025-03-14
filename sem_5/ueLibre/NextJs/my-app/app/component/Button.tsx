import clsx from "clsx";
export default function Button({
    primary,
    secondary
} : {
    primary?: boolean,
    secondary?: boolean
}) {
    return (
        <button
            className={
                clsx({
                    "bg-blue-500": primary,
                    "bg-green-400": secondary
                })
            }
        >Cliquez</button>
    );
}