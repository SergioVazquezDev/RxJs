// Para obtener las interfaces mediante la respuesta, podemos usar la web QuickType.io https://app.quicktype.io/

import { GithubUser } from './github-user.interface';

// Esta es propia de la respuesta del API de Github, por eso el final Resp
export interface GithubUsersResp {
    total_count:        number;
    incomplete_results: boolean;
    items:              GithubUser[];
}