import { APIRequestContext } from "playwright";

type UserInput = {
  name: string;
  job: string;
  task: string;
  status: boolean;
};

export class RegresApiCrud{

  private baseURL = process.env.API_BASE_URL!;


  constructor(private request: APIRequestContext){}

    async createRecord(inputData: UserInput) {
      const response = await this.request.post(`${this.baseURL}/users`, {
        data: inputData,
      });

      if (!response.ok()) throw new Error(`Create failed: ${response.status()}`);
      return response.json();
  }

  async retrieveRecord(id: number) {
    const response = await this.request.get(`${this.baseURL}/${id}`, {
    });

    if (!response.ok) throw new Error(`Get failed: ${response.status}`);
    return response.json();
  }

  async updateRecord(id: number, inputData: UserInput) {
    const response = await this.request.put(`${this.baseURL}/users/${id}`, {
      data: inputData,
    });

    if (!response.ok) throw new Error(`Update failed: ${response.status}`);
    return response.json();
  }

}
