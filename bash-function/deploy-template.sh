#!/bin/bash

## Base Template for Deployment Script
## AUTHOR     Seah Sheng Hong
## VERSION    1.3

################################################################################
# Help                                                                         #
################################################################################
Help()
{
    # Display Help
    echo
    echo "Deployment Script 1.3 (2022-08-15)"
    echo "This is a bash script to help deploy Application(s). The zipped folder should be the same name as zip file."
    echo
    echo "Syntax: bash deploy.sh -[h|z|d|n|c|b|i|I]"
    echo "options:"
    echo "h     Print this Help."
    echo "z     (Required) Archived file name. -z [filename.zip] (Prompt if not provided)."
    echo "d     (Optional) Destination directory. Default Use current directory if not provided."
    echo "n     (Optional) Deploy application directory name. Default use zip file name."
    echo "c     (Optional) Use Copy instead of Move command."
    echo "b     (Optional) Backup directory. -b [backupPath]. Default use destination directory."
    echo "i     Ignore backup. (Prompt confirmation to ignore backup)."
    echo "I     Force ignore backup. Will ignore -i or -b option if supplied together."
    echo
    echo "Usage:"
    echo "cd into /var/www/html"
    echo "To unzip admin.zip and use admin as app name"
    echo "bash deploy.sh -z /home/user/admin.zip"
    echo
    echo "To copy instead of move, use -c"
    echo "bash deploy.sh -c -z /home/user/admin.zip"
    echo
    echo "To unzip frontend.zip and use admin as app name"
    echo "bash deploy.sh -z /home/user/frontend.zip -n admin"
    echo
    echo "To backup at other directory instead of app parent directory"
    echo "bash deploy.sh -z /home/user/frontend.zip -n admin -b /var/www/backup"
    echo
}

################################################################################
# Clean Up                                                                     #
################################################################################
CleanUp()
{
    # Clean Up variables
    unset zipFilePath
    unset inputZipFilePath
    unset applicationParentDirectoryPath
    unset applicationPath
    unset applicationDirectoryName
    unset inputApplicationDirectoryName
    unset inputIgnoreBackup
    unset useCopyCommand
    unset ignoreBackup
    unset zipFileName
    unset zipFileExt
    unset zipFileNameNoExt
    unset applicationBackupParentPath
    unset applicationBackupPath
    unset currentDate
    unset currentTime
    unset backupDirectoryName
    unset inputOverwriteBackup
    unset shouldOverwriteBackup
    unset backupIsCompleted
    unset tempDirectoryNameOrFileName
    unset applicationZipFilePath
    unset tempCurrentMilliseconds
    unset programStartMillisecond
    unset programMillisecond
}

################################################################################
# Directory Path                                                               #
################################################################################
DirectoryPath()
{
    if [ $# -eq 2 ]; then
        local parentDirectoryPath=$1
        local directoryNameOrFileName=$2
    fi

    # Stop program
    if [[ $parentDirectoryPath == *\/ ]] || [[ $parentDirectoryPath == *\\ ]]; then
        # checks if passed in directory ends with / or \
        tempDirectoryNameOrFileName="$parentDirectoryPath$directoryNameOrFileName"
    elif [[ $parentDirectoryPath == *\/* ]]; then
        # checks if passed in directory does not ends with / or \
        # checks if passed in directory contains /
        tempDirectoryNameOrFileName="$parentDirectoryPath/$directoryNameOrFileName"
    elif [[ $parentDirectoryPath == *\\* ]]; then
        # checks if passed in directory does not ends with / or \
        # checks if passed in directory contains \
        tempDirectoryNameOrFileName="$parentDirectoryPath\\$directoryNameOrFileName"
    else
        echo "Invalid $1 path with $2"
        echo
        Exit 1
    fi
}

################################################################################
# Current Milliseconds                                                         #
################################################################################
CurrentMilliseconds()
{
    if [ $os = "Darwin" ]; then
        # Do something under Mac OS X platform
        tempCurrentMilliseconds=$(date +"%s000")
    elif [ "${os:0:5}" = "Linux" ]; then
        # Do something under GNU/Linux platform
        tempCurrentMilliseconds=$(date +"%s%3N")
    fi
}


################################################################################
# Exit                                                                         #
################################################################################
Exit()
{
    # Stop program
    CleanUp

    exitCode=0

    if (( $# > 0 )) ; then
        re='^(1?[0-9]{1,2}|2([0-4][0-9]|5[0-5]))$'
        if ! [[ $1 =~ $re ]] ; then
            echo "Invalid exit code $1"
            echo
            exit 1
        else
            exitCode=$1
        fi
    fi

    if [ $exitCode -gt 0 ]; then
        echo -e "\033[31m[Deployment]\033[m stopped $currentDate $currentTime"
    fi

    exit $((exitCode))
}

################################################################################
################################################################################
# Main program                                                                 #
################################################################################
################################################################################
os=$(uname -s)
echo "Detected OS: $os"

# if [[ $# -eq 0 ]] ; then
#     echo "No argument(s) provided."
#     Help
#     Exit 1
# fi

CleanUp

# Process the input options. Add options as needed.                            #
################################################################################
# Get the options
while getopts "hz:d:n:cb::iI" option; do
   case $option in
        (h) # display Help
            Help
            Exit 0;;
        (z) # zipFilePath
            zipFilePath="$OPTARG";;
        (d) # application parent directory path
            applicationParentDirectoryPath="$OPTARG";;
        (n) # application name
            applicationDirectoryName="$OPTARG";;
        (c) # use copy
            useCopyCommand="true";;
        (b) # backup parent directory path
            applicationBackupParentPath="$OPTARG";;
        (i) # ignore backup
            echo "-i flag detected. Are you sure to skip backup? [Y]es [N]o (use default backup or supplied -b backup) [S]top"
            echo -n "Input: "
            read inputIgnoreBackup

            case $inputIgnoreBackup in
                ([Yy]|[Yy][Ee][Ss])
                    ignoreBackup="true";;
                ([Nn]|[Nn][Oo])
                    echo "Continue backup using default"
                    echo;;
                ([Ss]|[Ss][Tt][Oo][Pp])
                    echo "Stopping"
                    echo
                    Exit 1;;
                (*)
                    echo -e "\033[31;40mError\033[m Invalid Option."
                    echo
                    Exit 1;;
            esac;;
        (I) # force ignore backup
            ignoreBackup="true";;
        (*) # incorrect option
            echo -e "\033[31;40mError\033[m Invalid option"
            Help
            Exit 1;;
   esac
done

CurrentMilliseconds
programStartMillisecond="$tempCurrentMilliseconds"
currentDate=$(date +"%F")
currentTime=$(date +"%T")
echo -e "\033[32m[Deployment]\033[m starts at $currentDate $currentTime"

# check zip file path input
if [ -z "$zipFilePath" ]; then
    # echo "-z [filename] option is required"
    # echo
    echo "Enter filename with path. e.g. /home/user/filename.zip"
    echo -n "Zip File: "
    read inputZipFilePath

    if [ -z "$inputZipFilePath" ]; then
        echo -e "\033[31;40mError\033[m Zip filename is required"
        echo
        Help
        Exit 1
    else 
        zipFilePath="$inputZipFilePath"
    fi
fi

# check zip file exists
if [ -f "$zipFilePath" ]; then
    zipFileName=$(basename -- "$zipFilePath")
    zipFileExt="${zipFileName##*.}"
    zipFileNameNoExt="${zipFileName%.*}"

else
    echo -e "\033[31;40mError\033[m Zip source \033[33m$zipFilePath\033[m does not exist."
    echo
    Exit 1
fi

# check app name
if [ -z "$applicationDirectoryName" ]; then
    applicationDirectoryName="$zipFileNameNoExt"
    echo -e "\033[30;43mWarn\033[m -n [applicationName] option is empty, will unzip as $applicationDirectoryName"
    echo

    # echo "Enter applciation name. e.g. psb-admin"
    # echo -n "Input: "
    # read inputApplicationDirectoryName

    # if [ -z "$inputApplicationDirectoryName" ]; then
    #     echo "Applciation name is required"
    #     echo
    #     Help
    #     Exit 1
    # else 
    #     applicationDirectoryName="$inputApplicationDirectoryName"
    # fi
fi

# check app parent directory path
if [ -z "$applicationParentDirectoryPath" ]; then
    applicationParentDirectoryPath="$(pwd)"
    echo -e "\033[30;43mWarn\033[m -d [applicationParentPath] option is empty, using current directory $applicationParentDirectoryPath"
    echo
fi

# check directory exists
if ! [ -d "$applicationParentDirectoryPath" ]; then
    echo -e "\033[31;40mError\033[m $applicationParentDirectoryPath directory does not exist"
    echo
    Exit 1
fi

# set applicationPath
DirectoryPath "$applicationParentDirectoryPath" "$applicationDirectoryName"
applicationPath="$tempDirectoryNameOrFileName"
unset tempDirectoryNameOrFileName

# # Checks is file directory is set
# if [ -z "$zipFileDirectoryPath" ]; then
#     echo "-d option is empty, using directory $HOME"
#     zipFilePath="$HOME/$zipFileName"
# else
#     DirectoryPath $zipFileDirectoryPath $zipFileName
#     zipFilePath="$tempDirectoryNameOrFileName"
#     unset tempDirectoryNameOrFileName
# fi

# check backup parent directory path
if [ -z "$applicationBackupParentPath" ]; then
    applicationBackupParentPath="$applicationParentDirectoryPath"
    echo -e "\033[30;43mWarn\033[m -b [applicationBackupParentPath] option is empty, using application directory $applicationBackupParentPath"
    echo
fi

# check backup parent directory exists
if ! [ -d "$applicationBackupParentPath" ]; then
    echo -e "\033[31;40mError\033[m $applicationBackupParentPath does not exists"
    echo
    Exit 1
fi

currentDate=$(date +"%Y%m%d")
currentTime=$(date +"%H%M")

backupDirectoryName="$applicationDirectoryName-$currentDate-$currentTime"

DirectoryPath "$applicationBackupParentPath" "$backupDirectoryName"
applicationBackupPath="$tempDirectoryNameOrFileName"
unset tempDirectoryNameOrFileName

####################################
# Start commands here              #
####################################

# check backup folder exists
if [ -d "$applicationBackupPath" ]; then
    echo "$applicationBackupPath exists. Do you want to overwrite the backup? [Y]es [N]o (stop)"
    echo -n "Input: "
    read inputOverwriteBackup

    case $inputOverwriteBackup in
        ([Yy]|[Yy][Ee][Ss])
            echo "> rm -rf $applicationBackupPath"
            echo "Removing $applicationBackupPath"
            rm -rf "$applicationBackupPath";;
        ([Nn]|[Nn][Oo])
            echo "Quiting."
            echo
            Exit 1;;
        (*)
            echo -e "\033[31;40mError\033[m Invalid Option."
            echo
            Exit 1;;
    esac
fi

# use move or cp command
if [ -z "$useCopyCommand" ]; then
    echo "> mv $zipFilePath $applicationParentDirectoryPath"
    echo "Moving from $zipFilePath to $applicationParentDirectoryPath"
    echo
    mv "$zipFilePath" "$applicationParentDirectoryPath"

    DirectoryPath "$applicationParentDirectoryPath" "$zipFileName"
    zipFilePath="$tempDirectoryNameOrFileName"
    unset tempDirectoryNameOrFileName
else
    echo "> cp $zipFilePath $applicationParentDirectoryPath"
    echo "Copying from $zipFilePath to $applicationParentDirectoryPath"
    echo
    cp "$zipFilePath" "$applicationParentDirectoryPath"
fi

DirectoryPath "$applicationBackupParentPath" "$applicationDirectoryName"
tempApplicationBackupPath="$tempDirectoryNameOrFileName"
unset tempDirectoryNameOrFileName

# check if current app exists, 
if [ -d "$applicationPath" ]; then

    # checks if has ignoreBackup flag
    if [ -z "$ignoreBackup" ]; then
        if ! [[ $applicationParentDirectoryPath == $applicationBackupParentPath ]]; then
            # move current app folder to backup directory
            echo "> mv $applicationPath $applicationBackupParentPath"
            echo "Moving old application to $applicationBackupParentPath"
            echo
            mv "$applicationPath" "$applicationBackupParentPath"
        fi

        # rename backup
        echo "> mv $tempApplicationBackupPath $applicationBackupPath"
        echo "Renaming backup $applicationDirectoryName to $backupDirectoryName"
        echo
        mv "$tempApplicationBackupPath" "$applicationBackupPath"

        $backupIsCompleted=1
    else
        # ignore back up
        echo "> rm -rf $applicationPath"
        echo "Removing old application without backup"
        echo
        rm -rf "$applicationPath"
    fi
fi

# unzip zip file
echo "> unzip -q $zipFilePath -d $applicationParentDirectoryPath"
echo "Unzipping $zipFilePath"
echo
unzip -q "$zipFilePath" -d "$applicationParentDirectoryPath"

# rename unzipped app name if not same
if ! [[ $applicationDirectoryName == $zipFileNameNoExt ]]; then
    DirectoryPath "$applicationParentDirectoryPath" "$zipFileNameNoExt"
    unzippedAppPath="$tempDirectoryNameOrFileName"
    unset tempDirectoryNameOrFileName

    echo "> mv $unzippedAppPath $applicationPath"
    echo "Renaming old file $zipFileNameNoExt to $applicationDirectoryName"
    echo
    mv "$unzippedAppPath" "$applicationPath"

fi

# remove zip file
DirectoryPath "$applicationParentDirectoryPath" "$zipFileName"
applicationZipFilePath="$tempDirectoryNameOrFileName"
unset tempDirectoryNameOrFileName

echo "> rm $applicationZipFilePath"
echo "Removing application zip file"
echo
rm "$applicationZipFilePath"

echo "Removed zip: $applicationZipFilePath"
if [ -z "$ignoreBackup" ]; then
    if [ -z "$backupIsCompleted" ] || [ $backupIsCompleted -ne 1 ]; then
        echo "No Application Backup"
    else
        echo "Backup completed: $applicationBackupPath"
    fi
fi
echo "Deployment completed: $applicationPath"

echo
CurrentMilliseconds
programEndMillisecond="$tempCurrentMilliseconds"
currentDate=$(date +"%F")
currentTime=$(date +"%T")
usedTimeMilliseconds=$(($programEndMillisecond-$programStartMillisecond))
echo -e "\033[32m[Deployment]\033[m Finished at $currentDate $currentTime. Used $usedTimeMilliseconds milliseconds"

CleanUp

################################################################################
# TODO                                                                         #
################################################################################
# TBA

################################################################################
# Change Log                                                                   #
################################################################################
# 1.3 (2022-08-15)
# Fixed string comparison from using double equal to single equal in CurrentMilliseconds.
# Fixed no backup but shows backup completed

# 1.2 (2021-11-17)
# Fixed move zip file to destination, unzip original path with no file found error
# Added timestamp

# 1.0 - 1.1 (2021-10-26)
# Initial development
# Fixed bugs
# Added null checks
# Added more options
# Added more descriptive help
