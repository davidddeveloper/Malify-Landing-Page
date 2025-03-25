"use client"
import React, { useEffect, useState } from "react";

interface Email {
    id: string;
    snippet: string;
    subject: string;
    from: string;
    date: string;
    body: string;
}

const EmailList: React.FC = () => {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await fetch("/api/gmail");
                const data: Email[] = await res.json();
                setEmails(data);
            } catch (error) {
                console.error("Error fetching emails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(emails)

    const summarizeOne = async () => {
        /*async function tuneModel(modelName: string) {
            const res = await fetch("/api/models/tuneModel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: modelName, type: "classify" }),
            });
            const data = await res.json()
            console.log(data)
        }
        await tuneModel("model001");*/
        const firstEmail = emails[5];
        console.log('this is the first email', firstEmail)
        if (firstEmail) {
            const res = await fetch("/api/summarize/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailContent: `Subject: ${firstEmail.subject}\n From: ${firstEmail.from}\n Date: ${firstEmail.date}\n` + firstEmail.body }),
            });
            const data: Email[] = await res.json();
            console.log('this is the data sha!!!', data);

        }
    }

    summarizeOne();

    const classifyEmail = async () => {
        /*async function tuneModel(modelName: string) {
            const res = await fetch("/api/models/tuneModel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: modelName, type: "classify" }),
            });
            const data = await res.json()
            console.log(data)
        }
        await tuneModel("model001");*/
        const firstEmail = emails[5];
        console.log('this is the first email', firstEmail)
        if (firstEmail) {
            const res = await fetch("/api/classify/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emailContent: `Subject: ${firstEmail.subject}\n From: ${firstEmail.from}\n Date: ${firstEmail.date}\n` + firstEmail.body }),
            });
            const data: Email[] = await res.json();
            console.log('this is the classification sha!!!', data);

        }
    }
    classifyEmail();
    return (
        <div>
            <h2>Latest Emails</h2>
            <ul>
                {emails.map((email) => (
                    
                    <li key={email.id}>
                        <strong>{email.id}</strong>: {email.snippet}
                        <p>{email.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmailList;
