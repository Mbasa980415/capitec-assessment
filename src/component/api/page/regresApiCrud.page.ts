import { APIRequestContext } from "playwright";


export class RegresApiCrud{

     private baseURL = process.env.API_BASE_URL!;

    constructor(private request: APIRequestContext){}

     async createRecord(name: string, job: string) {
    const response = await this.request.post(`${this.baseURL}/users`, {
      data: { name, job },
    });

    if (!response.ok()) throw new Error(`Create failed: ${response.status()}`);

    return response.json();
  }

  async retrieveRecord(id: number) {
    console.log("URL ", this.baseURL)
    const response = await this.request.get(`${this.baseURL}/${id}`, {
    });

    if (!response.ok) throw new Error(`Get failed: ${response.status}`);
    return response.json();
  }

  async updateRecord(id: number, name: string, job: string) {
    const response = await this.request.put(`${this.baseURL}/users/${id}`, {
      data: { name, job },
    });

    if (!response.ok) throw new Error(`Update failed: ${response.status}`);
    return response.json();
  }

  async deleteRecord(id: number) {
    const response = await this.request.delete(`${this.baseURL}/users/${id}`, {
    });

    if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
    return { success: true };
  }
}
