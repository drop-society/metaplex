export default function (n): string {
  let units = ' GB';
  let dn = n;

  if (n >= 1000) {
    dn = n / 1000.0;
    units = ' TB';
  }
  return (dn || '0') + units;
}
