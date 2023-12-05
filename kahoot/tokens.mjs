export function solveChallenge(challenge){
  challenge = challenge.replace(/(\u0009|\u2003)/mg, "");
  challenge = challenge.replace(/this /mg, "this");
  challenge = challenge.replace(/ *\. */mg, ".");
  challenge = challenge.replace(/ *\( */mg, "(");
  challenge = challenge.replace(/ *\) */mg, ")");
  challenge = challenge.replace("console.", "");
  challenge = challenge.replace("this.angular.isObject(offset)", "true");
  challenge = challenge.replace("this.angular.isString(offset)", "true");
  challenge = challenge.replace("this.angular.isDate(offset)", "true");
  challenge = challenge.replace("this.angular.isArray(offset)", "true");

  const merger = "var _ = {" +
      "    replace: function() {" +
      "        var args = arguments;" +
      "        var str = arguments[0];" +
      "        return str.replace(args[1], args[2]);" +
      "    }" +
      "}; " +
      "var log = function(){};" +
      "return ";
  return Function(merger + challenge)();
}

export function concatTokens(headerToken, challengeToken) {
    // Combine the session token and the challenge token together to get the string needed to connect to the websocket endpoint
    for (var token = "", i = 0; i < headerToken.length; i++) {
        var char = headerToken.charCodeAt(i);
        var mod = challengeToken.charCodeAt(i % challengeToken.length);
        var decodedChar = char ^ mod;
        token += String.fromCharCode(decodedChar);
    }
    return token;
}
