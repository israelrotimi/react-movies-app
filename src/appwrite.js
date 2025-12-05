import { Client, ID, TablesDB } from "appwrite";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

const table = new TablesDB(client)


export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use Appwrite SDK to check if the search term exists in the database
    // 2. If it does, update the count
    // 3. If it doesn't, create a new entry with the search term and count as 1
    try {
        const result = await table.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID
        })
        console.log(result);
        if (result.total !== 0) {
            // find the row with the search term
            const row = result.rows.find(row => row.searchTerm === searchTerm);
            console.log(row)
            if (row) {
                // update the count
                const updatedCount = row.count + 1;
                await table.updateRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID,
                    rowId: row.$id,
                    data: {
                        count: updatedCount
                    }
                });
            } else {
                // create a new entry
                await table.createRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID,
                    rowId: ID.unique(),
                    data: {
                        searchTerm: searchTerm,
                        count: 1,
                        movie_id: movie.id,
                        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }
                })
            }
        } else {
            // create a new entry
            await table.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: {
                    searchTerm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            })
        }
        
    } catch (error) {
        console.error(error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await table.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            orderAttributes: ['count'],
            orderTypes: ['DESC'],
            limit: 5
        });
        return result.rows;
    } catch (error) {
        console.error(error);
    }
}