import { Injectable, Type } from '@nestjs/common';
import { DefaultAzureCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";

/**
 * @desc Use this class to get secrets that are configured on cloud by default it uses environment variables i.e SM_REGION, SM_ACCESS_KEY_ID and SM_SECRET_ACCESS_KEY to connect with kms server
 * you can also specify your configuration using constructor
 */
@Injectable()
export class KeyVaultService {
    //#region fields
    private secretStore: Map<string, string | Record<string, any>> = new Map<string, string | Record<string, any>>()
    private credential: DefaultAzureCredential;
    private client: KeyClient;
    //#endregion

    //#region constructors
    public constructor() {
        // this.credential = new DefaultAzureCredential();
        // // Build the URL to reach your key vault
        // const vaultName = process.env.VAULT_NAME;
        // const url = `https://${vaultName}.vault.azure.net`;
        // this.client = new KeyClient(url, this.credential);
    }
    //#endregion

    //#region private methods


    //#endregion

    public async getSecretValue(secretName: string) {
        const result = await this.client.getKey(secretName);
        console.log(result);
    }
}
