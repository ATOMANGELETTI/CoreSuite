use clap::{Parser, Subcommand};
use coresuite_cli::run_ping;
use coresuite_core::{suite_name, version};

#[derive(Parser)]
#[command(name = "coresuite", version, about = "CoreSuite command-line interface")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Echo a message through coresuite-core
    Ping { message: String },
    /// Print the core crate version
    Version,
    /// Print the suite name
    SuiteName,
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Ping { message } => {
            let response = run_ping(&message);
            println!("{}", response.message);
        }
        Commands::Version => {
            println!("{}", version());
        }
        Commands::SuiteName => {
            println!("{}", suite_name());
        }
    }
}
