// Ambient declarations for dependencies that ship no types.

declare module '@kalkih/lz-string' {
  export function compress(input: string): string;
  export function decompress(input: string): string;
  export function compressToUTF16(input: string): string;
  export function decompressFromUTF16(input: string): string;
}
