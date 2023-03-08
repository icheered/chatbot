# ICheered - Chatbot!
It is exactly like ChatGPT, but then with some cool features built on top of it. Under the hood it uses gpt-3.5-turbo by OpenAI.

This is meant for personal use, I have not added a login screen or anything so security is absolute crap. Perhaps it will come in the future if I find people abusing my API key.

Features
- [x] Code formatting (like chatgpt)
- [x] Message history (like chatgpt)
- [x] Raw code toggle
- [x] Suffix prompt (add certain text to every single request)
- [ ] Mobile support
- [ ] Show token usage in thread title
- [ ] Hide suffix prompt, and add hover-able info icon
- [ ] Store API keys in localstorage
- [ ] Add a login screen?
- [ ] Format tables as latex tables
- [ ] Let AI response stream to the correct chat instead of the selected chat


Demonstration of working base stuff:
![Recording 2023-03-06 at 00 04 21](https://user-images.githubusercontent.com/37150873/222995773-f348f220-bfbc-4cab-8780-c43eff821bdb.gif)

Demonstration of suffix prompt.
![Recording 2023-03-06 at 01 31 57](https://user-images.githubusercontent.com/37150873/222995780-e2b830bb-aae1-4444-a5a0-5a5db247bc89.gif)

## Personal use
Get your OpenAI API key: https://platform.openai.com/account/api-keys
Create an account on Supabase and create a new database.

The following is the SQL prompt you can run to create all the tables:
```sql
CREATE TABLE threads2 (
    thread_id UUID PRIMARY KEY,
    thread_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT timezone('utc'::text, now())
);

CREATE TABLE settings2 (
    key TEXT PRIMARY KEY,
    value TEXT
);

CREATE TABLE messages2 (
    id UUID PRIMARY KEY,
    thread_id UUID,
    role TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT timezone('utc'::text, now()),
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id)
);
```

Go to settings and find the `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
Fill out the settings in .env.example, and you're ready to go!
