import { DefaultAzureCredential } from '@azure/identity';
import { Injectable } from '@nestjs/common';
import { SecretClient } from "@azure/keyvault-secrets";

@Injectable()
export class SecretService {
    //#region private fields    
    private credential: DefaultAzureCredential;
    private client: SecretClient;
    //#endregion

    //#region constructors
    public constructor() {
        this.credential = new DefaultAzureCredential();
        // Build the URL to reach your key vault
        const vaultName = process.env.VAULT_NAME;
        const url = `https://${vaultName}.vault.azure.net`;
        this.client = new SecretClient(url, this.credential);
    }
    //#endregion

    //#region private methods
    //#endregion

    //#region public methods
    public async getSecretValue(secretName: string) {
        try {
            const result = await this.client.getSecret(secretName);
            return result;
        } catch (error) {
            return error;
        }
    }
    //#endregion
}
