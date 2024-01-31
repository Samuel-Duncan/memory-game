class FetchData {
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching data from ${url}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static processData(results, gameIds) {
    return results
      .filter((result) => gameIds.includes(result.id))
      .map((result) => ({
        id: result.id,
        name: result.name,
        imageUrl: result.background_image,
      }));
  }

  static async fetchAndProcessData(url, gameIds) {
    const response = await this.fetchData(url);
    return this.processData(response.results, gameIds);
  }

  static async getAllData() {
    const baseUrl = `https://api.rawg.io/api/games?key=27516e003a624c4389aa6cde8779b5b6&page=`;
    const totalPages = 14;
    const gameIds = [
      3498, 3328, 28, 41494, 290856, 3387, 28568, 2093, 326243, 3497, 857,
      28199,
    ];
    let allResults = [];

    try {
      const pagePromises = [];

      // Prepare promises for fetching and processing data for each page concurrently
      for (let page = 1; page <= totalPages; page++) {
        const pageUrl = baseUrl + page;
        pagePromises.push(this.fetchAndProcessData(pageUrl, gameIds));
      }

      // Fetch and process data for all pages concurrently
      const pageResponses = await Promise.all(pagePromises);
      pageResponses.forEach((response) => {
        allResults = [...allResults, ...response];
      });

      return allResults;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getData() {
    try {
      const allData = await this.getAllData();
      return allData;
    } catch (error) {
      console.error('Error fetching and processing data:', error);
    }
  }
}

export { FetchData };
