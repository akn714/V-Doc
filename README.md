# V-Doc ( Virtual Doctor )

link : https://v-doc.adarshkumar35.repl.co/

* An AI assistant trained on medication data to assist and suggest you medication required for the any disease or injuries.
* Backend of this project is written in python and Frontend of this project is written in javascripts frontend framework React.js.
* Frontend makes API calls to the backend on '/chat' route to get generated response from LLM, langchain and pinecone_db based on the sent query from frontend. Then the received response is populated on the webpage.
* The backend generates the response based on the data stored in pinecone database, here this data is medication data pushed in pinecone database.
