import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  network: string;
}

export function WalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    network: "sei-testnet"
  });
  
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    try {
      // Check for injected wallet (MetaMask, etc.)
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_accounts' 
        });
        
        if (accounts.length > 0) {
          const balance = await getBalance(accounts[0]);
          setWallet({
            isConnected: true,
            address: accounts[0],
            balance,
            network: "sei-testnet"
          });
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const getBalance = async (address: string): Promise<string> => {
    try {
      if ((window as any).ethereum) {
        const balance = await (window as any).ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        
        // Convert Wei to SEI (assuming 18 decimals)
        const balanceInSei = parseInt(balance, 16) / Math.pow(10, 18);
        return balanceInSei.toFixed(4);
      }
      return "0.0000";
    } catch (error) {
      console.error("Error getting balance:", error);
      return "0.0000";
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Check if MetaMask or compatible wallet is installed
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        // Request account access
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        });

        if (accounts.length > 0) {
          // Add/Switch to Sei testnet
          try {
            await (window as any).ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x530' }], // 1328 in hex (Sei testnet)
            });
          } catch (switchError: any) {
            // If network doesn't exist, add it
            if (switchError.code === 4902) {
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x530',
                  chainName: 'Sei Testnet',
                  nativeCurrency: {
                    name: 'SEI',
                    symbol: 'SEI',
                    decimals: 18
                  },
                  rpcUrls: ['https://evm-rpc-testnet.sei-apis.com'],
                  blockExplorerUrls: ['https://seitrace.com']
                }]
              });
            }
          }

          const balance = await getBalance(accounts[0]);
          
          setWallet({
            isConnected: true,
            address: accounts[0],
            balance,
            network: "sei-testnet"
          });

          toast({
            title: "Wallet Connected",
            description: `Connected to ${accounts[0].slice(0, 8)}...${accounts[0].slice(-6)}`,
          });
        }
      } else {
        // No wallet detected
        toast({
          title: "No Wallet Found",
          description: "Please install MetaMask or another compatible wallet.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed", 
        description: error.message || "Failed to connect wallet.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: null,
      network: "sei-testnet"
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (wallet.isConnected) {
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="text-sm">
              <p className="font-medium text-green-900">{formatAddress(wallet.address!)}</p>
              <p className="text-green-600">{wallet.balance} SEI</p>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={disconnectWallet}
          className="text-gray-600 hover:text-gray-800"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      {isConnecting ? (
        <>
          <i className="fas fa-spinner fa-spin mr-2"></i>
          Connecting...
        </>
      ) : (
        <>
          <i className="fas fa-wallet mr-2"></i>
          Connect Wallet
        </>
      )}
    </Button>
  );
}