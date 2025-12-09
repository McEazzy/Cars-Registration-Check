/**
 * Hook to receive SignalR messages from the backend
 */
import { HubConnectionBuilder, type HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";

export const useSignalR = (hubURL: string, onConnect?: () => void ) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(hubURL)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [hubURL]);

    useEffect(() => {
        if (connection){
            connection.start()
                .then(() => {
                    console.log("SignalR Connected");
                    if (onConnect) onConnect(); // initiate the callback to RegoPage to change value once the listener fully established
                })
                .catch((e) => console.error("SignalR Connection Error: ", e));
        }

        return () => {
            if (connection){
                connection.stop();
           }
        }   
    }, [connection]);

    return connection;
}