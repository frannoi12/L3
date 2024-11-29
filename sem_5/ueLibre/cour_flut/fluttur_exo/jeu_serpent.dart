var main(){
  List<String> Jar_contents = [
    "C1",
    "C2",
    "C3",
    "serpent",
    "C4",
  ];
  jar_contents.shuffle();
  // print(jar_content);
  print("1 | 2 | 3 | 4 | 5 ");
  int user_choice = 3;
  int choice_index = user_choice - 1 ;
  if(jar_content[choice_index] == "serpent"){
    print("you loose !");
  }else{
    print("You Win !")
  }
}


void main() {
  print("Factoriels des nombres de 1 à 10 :");

  for (int i = 1; i <= 10; i++) {
    int factorial = calculateFactorial(i);
    print("Le factoriel de $i est $factorial");
  }
}

int calculateFactorial(int n) {
  if (n == 0 || n == 1) {
    return 1;
  } else {
    int result = 1;
    for (int i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}