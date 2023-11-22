import { json, LoaderFunction } from '@remix-run/node';
import pool from '../db';
import { useLoaderData } from '@remix-run/react';

export let loader: LoaderFunction = async () => {
    const [rows] = await pool.execute('SELECT * FROM your_table');
    return json(rows);
  };
  
export default function Login(){
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            <h1>Login Route</h1>
        </div>
    )

}