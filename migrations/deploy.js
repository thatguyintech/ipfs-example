async function main() {
  // We get the contract to deploy
  const UniqueAsset = await ethers.getContractFactory("UniqueAsset");
  const uniqueAsset = await UniqueAsset.deploy();

  console.log("UniqueAsset deployed to:", uniqueAsset.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });