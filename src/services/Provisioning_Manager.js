// Importações dos arquivos protobuf (assumindo que já estão compilados)
// import wifiConfigpb from './proto_js/wifi_config_pb';
// import wifiScanpb from './proto_js/wifi_scan_pb';
// import sessionpb from './proto_js/session_pb';
// import sec0pb from './proto_js/sec0_pb';

import {Buffer} from 'buffer';
import 'text-encoding';

export default class Provisioning {
  constructor() {
    this.device = null;
    this.server = null;
    this.service = null;
    this.sessionEstablished = false;
    this.availableNetworks = [];
    this.lookup = {};
  }

  mapCharacteristicsBySuffix(characteristics) {
    const suffixToKeyMap = {
      ff4f: 'prov-session',
      ff50: 'prov-scan',
      ff51: 'prov-ctrl',
      ff52: 'prov-config',
      ff53: 'proto-ver',
      ff54: 'custom-data',
    };

    const lookup = {};

    characteristics.forEach(char => {
      const uuid = char.uuid.toLowerCase();
      const suffix = uuid.split('-')[0].slice(-4);
      const key = suffixToKeyMap[suffix];
      if (key) {
        lookup[key] = char;
      }
    });

    return lookup;
  }

  async connect(deviceName = 'PROV_82D988') {
    try {
      console.log('Conectando ao dispositivo:', deviceName);
      
      // Solicitar dispositivo Bluetooth pelo nome
      this.device = await navigator.bluetooth.requestDevice({
        filters: [
          {
            name: deviceName
          }
        ],
        optionalServices: ['*']  // Permite acesso a todos os serviços
      });

      console.log('Dispositivo selecionado:', this.device.name);

      // Conectar ao servidor GATT
      this.server = await this.device.gatt.connect();
      console.log('Conectado ao servidor GATT');

      // Obter todos os serviços disponíveis
      const services = await this.server.getPrimaryServices();
      console.log('Serviços encontrados:', services.length);
      services.forEach((service, index) => {
        console.log(`  ${index + 1}. ${service.uuid}`);
      });

      // Obter todas as características de todos os serviços
      const allCharacteristics = [];
      for (const service of services) {
        try {
          const characteristics = await service.getCharacteristics();
          console.log(`Serviço ${service.uuid}: ${characteristics.length} características`);
          characteristics.forEach(char => {
            console.log(`  - ${char.uuid}`);
          });
          allCharacteristics.push(...characteristics);
        } catch (error) {
          console.warn(`Erro ao obter características do serviço ${service.uuid}:`, error);
        }
      }

      // Mapear características por sufixo
      this.lookup = this.mapCharacteristicsBySuffix(allCharacteristics);
      console.log('Características mapeadas:', Object.keys(this.lookup));
      
      return this.device;
    } catch (error) {
      console.error('Erro na conexão:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.device && this.server) {
      await this.server.disconnect();
      this.device = null;
      this.server = null;
      this.service = null;
      this.lookup = {};
    }
  }

  async getProtocolVersion() {
    const characteristic = this.lookup['proto-ver'];
    if (!characteristic) {
      throw new Error('Característica proto-ver não encontrada');
    }

    await characteristic.writeValue(new Uint8Array([0]));
    const value = await characteristic.readValue();
    return Buffer.from(value).toString('utf-8');
  }

  async startSession() {
    const characteristic = this.lookup['prov-session'];
    if (!characteristic) {
      throw new Error('Característica prov-session não encontrada');
    }

    // Simplificado temporariamente - apenas marca sessão como estabelecida
    this.sessionEstablished = true;
    console.log('Sessão estabelecida (simplificado)');
  }

  async scanNetworks() {
    const characteristic = this.lookup['prov-scan'];
    if (!characteristic) {
      throw new Error('Característica prov-scan não encontrada');
    }

    // Simplificado temporariamente - retorna redes mock
    console.log('Scan de redes (simplificado)');
    
    const mockNetworks = [
      { ssid: 'WiFi_Casa', bssid: 'aa:bb:cc:dd:ee:ff', channel: 6, rssi: -45, auth: 3 },
      { ssid: 'WiFi_Empresa', bssid: '11:22:33:44:55:66', channel: 11, rssi: -52, auth: 4 },
      { ssid: 'WiFi_Vizinho', bssid: 'aa:11:bb:22:cc:33', channel: 1, rssi: -67, auth: 3 }
    ];

    this.availableNetworks = mockNetworks;
    return mockNetworks;
  }

  async sendWifiConfig(ssid, pass) {
    const characteristic = this.lookup['prov-config'];
    if (!characteristic) {
      throw new Error('Característica prov-config não encontrada');
    }

    // Simplificado temporariamente - apenas log
    console.log('Enviando configuração Wi-Fi (simplificado):', { ssid, pass });
  }

  async applyWifiConfig() {
    const characteristic = this.lookup['prov-config'];
    if (!characteristic) {
      throw new Error('Característica prov-config não encontrada');
    }

    // Simplificado temporariamente - apenas log
    console.log('Aplicando configuração Wi-Fi (simplificado)');
  }

  async getWifiStatus() {
    const characteristic = this.lookup['prov-config'];
    if (!characteristic) {
      throw new Error('Característica prov-config não encontrada');
    }

    // Simplificado temporariamente - retorna status mock
    console.log('Obtendo status Wi-Fi (simplificado)');
    
    return {
      state: 'connected',
      reason: null,
      raw: {
        sta_state: 0,
        fail_reason: 0,
      },
    };
  }

  async checkWifiUntilStable(maxAttempts = 30, delayMs = 1000) {
    let lastKnownStatus = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const status = await this.getWifiStatus();
        console.log(`Tentativa ${attempt}/${maxAttempts} → Estado: ${status.state}`);

        lastKnownStatus = status;

        if (status.state === 'connected' || status.state === 'failed') {
          return status;
        }

        await new Promise(resolve => setTimeout(resolve, delayMs));
      } catch (error) {
        console.warn(`Tentativa ${attempt}: erro ao obter status Wi-Fi: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    if (lastKnownStatus) {
      return lastKnownStatus;
    }

    throw new Error('Não foi possível obter status de conexão Wi-Fi após todas as tentativas.');
  }

  async sendCustomAttributeDeviceId(deviceId) {
    const characteristic = this.lookup['custom-data'];
    if (!characteristic) {
      throw new Error('Característica custom-data não encontrada');
    }

    const payload = {
      command: 'set_device_id',
      value: deviceId,
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    await characteristic.writeValue(new TextEncoder().encode(base64Payload));
  }
}
