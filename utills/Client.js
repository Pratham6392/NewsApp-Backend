import  pg  from 'pg';
const Client=pg.Client;


export async function getClient(){
    const client =new Client("postgres://postgress:Khatri@localhost:5432/News_yt")
    await client.connect();
    return client;
}