import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { preInformation } from './pre-information';
import * as CI from '../../files/CI_aggregated.json';
import axios from 'axios';

@Injectable()
export class InformationService {
  async setLocalServerInformation() {
    const geo_key = process.env.GEO_KEY;
    const userIp = await this.getLocalServerIp();
    const serverInformation = await this.getLocalServerInformation(
      geo_key,
      userIp,
    );

    preInformation.location = serverInformation.country_code;
    preInformation.countryName = serverInformation.country_name;
    preInformation.carbonIntensity = this.getCarbonIntensity(
      preInformation.location,
    );
    preInformation.PUE = '1.67';
    preInformation.PSF = '1';

    console.log(preInformation);
  }

  private async getLocalServerIp(): Promise<string> {
    return new Promise((resolve, reject) => {
      exec('curl ifconfig.me', (error, stdout) => {
        if (error) {
          console.error(`Error: ${error}`);
          reject(error);
        }

        const publicIp = stdout.trim();
        resolve(publicIp);
      });
    });
  }

  private async getLocalServerInformation(geo_key: string, userIp: string) {
    const apiURL = `https://api.ip2location.io/?key=${geo_key}&ip=${userIp}&format=json`;

    try {
      const response = await axios.get(apiURL);

      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  private getCarbonIntensity(location: string) {
    for (const item of CI) {
      if (item.location === location) {
        return item.carbonIntensity;
        break;
      }
    }
  }
}
