!function(){var e=$.getSetIniDbNumber("settings","hostReward",200),s=$.getSetIniDbString("settings","hostMessage",$.lang.get("hosthandler.host.message")),t=($.getSetIniDbBoolean("settings","hostHistory",!1),216e5),n={},o=!1;$.bind("twitchHostsInitialized",function(){$.bot.isModuleEnabled("./handlers/hostHandler.js")&&($.consoleLn(">> Enabling hosts announcements"),$.logEvent("hostHandler.js",23,"Host announcements enabled"),o=!0)}),$.bind("twitchHosted",function(a){if($.bot.isModuleEnabled("./handlers/hostHandler.js")){var i=$.username.resolve(a.getHoster()),r=$.systemTime(),h=s,g={};if(o){if($.writeToFile(i,"./addons/hostHandler/latestHost.txt",!1),n[i]){if(n[i].hostTime>r)return;n[i].hostTime=r+t}else n[i]={hostTime:r+t};h=h.replace("(name)",i),h=h.replace("(reward)",e.toString()),$.say(h),$.getIniDbBoolean("settings","hostHistory",!1)&&(g={host:i,time:r,viewers:0},$.inidb.set("hosthistory",i+"_"+r,JSON.stringify(g)))}}}),$.bind("twitchUnhosted",function(e){if($.bot.isModuleEnabled("./handlers/hostHandler.js")){var s=e.getHoster();delete n[s]}}),$.bind("command",function(e){var t,o=e.getSender().toLowerCase(),a=e.getCommand(),i=e.getArgs(),r=parseInt(i[0]),h=[];if(a.equalsIgnoreCase("hostreward")){if(!$.isAdmin(o))return void $.say($.whisperPrefix(o)+$.adminMsg);if(isNaN(r))return void $.say($.whisperPrefix(o)+$.lang.get("hosthandler.set.hostreward.usage",$.pointNameMultiple));$.inidb.set("settings","hostReward",r),$.say($.whisperPrefix(o)+$.lang.get("hosthandler.set.hostreward.success",$.getPointsString(r))),$.logEvent("hostHandler.js",100,o+" changed the host reward to "+r)}if(a.equalsIgnoreCase("hostmessage")){if(!i||0==i.length)return void $.say($.whisperPrefix(o)+$.lang.get("hosthandler.set.hostmessage.usage"));s=e.getArguments(),$.inidb.set("settings","hostMessage",s),$.say($.whisperPrefix(o)+$.lang.get("hosthandler.set.hostmessage.success")),$.logEvent("hostHandler.js",115,o+" changed the host message to "+s)}if(a.equalsIgnoreCase("unhost")){if(!$.isAdmin(o))return void $.say($.whisperPrefix(o)+$.adminMsg);$.say(".unhost")}if(a.equalsIgnoreCase("host")){if(!$.isAdmin(o))return void $.say($.whisperPrefix(o)+$.adminMsg);$.say(".host "+i[0]),$.logEvent("hostHandler.js",140,o+" hosted channel "+i[1])}if(a.equalsIgnoreCase("hostcount")){for(t in n)h.push(t);if(0==h.length)return void $.say($.lang.get("hosthandler.hostcount.404"));$.say($.lang.get("hosthandler.hostcount",h.length))}if(a.equalsIgnoreCase("hostlist")){for(t in n)h.push(t);if(0==h.length)return void $.say($.lang.get("hosthandler.hostlist.404"));$.say($.lang.get("hosthandler.hostlist",h.join(", ")))}if(a.equalsIgnoreCase("hosthistory")){if(!i||0==i.length)return void $.say($.whisperPrefix(o)+$.lang.get("hosthistory.usage",$.getIniDbBoolean("settings","hostHistory")?"on":"off"));if(i[0].equalsIgnoreCase("on"))$.setIniDbBoolean("settings","hostHistory",!0),$.say($.whisperPrefix(o)+$.lang.get("hosthistory.change",$.getIniDbBoolean("settings","hostHistory")?"on":"off"));else{if(!i[0].equalsIgnoreCase("off"))return void $.say($.whisperPrefix(o)+$.lang.get("hosthistory.usage",$.getIniDbBoolean("settings","hostHistory")?"on":"off"));$.setIniDbBoolean("settings","hostHistory",!1),$.say($.whisperPrefix(o)+$.lang.get("hosthistory.change",$.getIniDbBoolean("settings","hostHistory")?"on":"off"))}}}),$.bind("initReady",function(){$.bot.isModuleEnabled("./handlers/hostHandler.js")&&($.registerChatCommand("./handlers/hostHandler.js","hostmessage",1),$.registerChatCommand("./handlers/hostHandler.js","hostreward",1),$.registerChatCommand("./handlers/hostHandler.js","unhost",1),$.registerChatCommand("./handlers/hostHandler.js","host",1),$.registerChatCommand("./handlers/hostHandler.js","hostcount"),$.registerChatCommand("./handlers/hostHandler.js","hostlist"),$.registerChatCommand("./handlers/hostHandler.js","hosthistory",1))})}();
