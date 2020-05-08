
class JsonLoader {
  public Load<T>(file: File): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(JSON.parse(fileReader.result as string));
      }
      fileReader.onerror = (err) => {
        reject(err);
      }
      fileReader.readAsText(file);
    })
  }
}

export default JsonLoader;