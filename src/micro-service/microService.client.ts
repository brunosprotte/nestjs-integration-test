import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export default class MicroServiceClient {
  constructor(private readonly httpService: HttpService) {}

  async func() {
    return this.msPost();
  }

  async msPost() {
    console.log('running mspost function');
    return this.httpService
      .get('https://pokeapi.co/api/v2/pokemon/3')
      .pipe(map((response) => response.data))
      .toPromise()
      .then((result) => result.name);
  }
}
