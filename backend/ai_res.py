# environment variables
import os

import pinecone
from dotenv import load_dotenv
from langchain import PromptTemplate
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI

# from conversations import history, chat_history
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.vectorstores import Pinecone

load_dotenv()

# repl.it asks for these useless lines
os.environ['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")
os.environ['MY_PINECONE_API_KEY'] = os.getenv("MY_PINECONE_API_KEY")
os.environ['MY_PINECONE_ENV'] = os.getenv("MY_PINECONE_ENV")
os.environ['MY_PINECONE_INDEX_NAME'] = os.getenv("MY_PINECONE_INDEX_NAME")

# embeddings
embeddings = OpenAIEmbeddings()

# initializing pinecone db
print('[+] Initializing pinecone db...')
pinecone.init(
    api_key=os.getenv('MY_PINECONE_API_KEY'),
    environment=os.getenv('MY_PINECONE_ENV'),
)

# index_name = os.getenv('PINECONE_INDEX_NAME')
index_name = 'on-v-doctor-data'
index = pinecone.Index(index_name)
index.describe_index_stats()

print("[+] Index Stats: ")
print(index.describe_index_stats())
print('[+] Creating vector store')
# switch back to normal index for langchain
index = pinecone.Index(index_name)
# embed will be created by client
vectorstore = Pinecone(index, embeddings.embed_query, "text")

# docsearch
docsearch = Pinecone.from_existing_index(index_name, embeddings)

# completion llm
llm = ChatOpenAI(openai_api_key=os.getenv('OPENAI_API_KEY'),
                 model_name='gpt-3.5-turbo',
                 temperature=0.3)

# custom prompt
GENIEPROMPT = "Your name is V-Doc means Virtual Doctor. You are an Medical expert/mentor. Your users need help he medication. You provide accurate and good medication to user questions in under 2000 characters, after researching through the vector DB. If you are getting question not of medical field then say sorry and skip them. Provide additional descriptions of any complex terms being used in the response.\n\n The following is a teaching conversation between a human and an AI. The AI is helping and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. \n\nCurrent conversation: {history}\n\nUser: {input}\n\nAi: "

prompt_template = PromptTemplate(input_variables=["input", "history"],
                                 template=GENIEPROMPT)
chain = ConversationChain(llm=llm,
                          prompt=prompt_template,
                          verbose=False,
                          memory=ConversationBufferMemory())


def get_response(query, chat_hist):
    # fetching docs from pinecone db
    print('[+] fetching docs from pinecone_db...')
    docs = docsearch.similarity_search(query)
    print(f'[+] {len(docs)} docs fetched.')

    result = chain.run({"input": query, "history": chat_hist})
    print('[+] results fetched')

    chat_hist.save_context({"input": query}, {"output": result})
    return result, chat_hist


if __name__ == "__main__":
    print("START THE CHAT:\n")
    chat_hist = ConversationBufferMemory()
    while True:
        query = input("[You]: ")
        response, chat_hist = get_response(query, chat_hist)
        print(response)
